import {
    blob,
    Canister,
    ic,
    Err,
    nat64,
    Ok,
    Opt,
    Principal,
    query,
    Record,
    Result,
    StableBTreeMap,
    text,
    update,
    Variant,
    Vec
} from 'azle';

const Company = Record({
    id: Principal,
    name: text,
    location: text,
    foundedDate: text,
    linkedInLink: text,
    image: blob,
    openJobIds: Vec(Principal)
})
type Company = typeof Company.tsType

const Job = Record({
    id: Principal,
    title: text,
    location: text,
    jobType: text,
    description: text,
    requirements: text,
    company: Principal,
    issuerEmail: text
})
type Job = typeof Job.tsType

const JobHiringError = Variant({
    JobNotFound: Principal,
    CompanyNotFound: Principal
});
type JobHiringError = typeof JobHiringError.tsType

let companies = StableBTreeMap<Principal, Company>(0);
let jobs = StableBTreeMap<Principal, Job>(1);

export default Canister({
    createCompany: update([text, text, text, text, blob], Company, (name, location, foundedDate, linkedInLink, image) => {
        const id = generateId();
        const company: Company = {
            id,
            name,
            location,
            foundedDate,
            linkedInLink,
            image,
            openJobIds: []
        };
        companies.insert(id, company);
        return company;
    }),
    getCompanyById: query([Principal], Opt(Company), (id) => {
        return companies.get(id);
    }),
    createJob: update([text, text, text, text, text, Principal, text],
        Result(Job, JobHiringError),
        (title, location, jobType,
         description, requirements, companyId, issuerEmail) => {
            // Check if company exists
            const companiesOpt = companies.get(companyId);
            if ('None' in companiesOpt) {
                return Err({
                    CompanyNotFound: companyId
                });
            }

            // Insert New Open Job
            const id = generateId();
            const job: Job = {
                id,
                title,
                location,
                jobType,
                description,
                requirements,
                company: companyId,
                issuerEmail
            };
            jobs.insert(id, job);

            // Update Company
            const company = companiesOpt.Some;
            const updatedCompany: Company = {
                ...company,
                openJobIds: [...company.openJobIds, job.id]
            };
            companies.insert(companyId, updatedCompany);

            return Ok(job);
        }),
        getJobById: query([Principal], Opt(Job), (id) => {
            return jobs.get(id);
        }),
        getJobs: query([], Vec(Job), () => {
            return jobs.values();
        }),
        deleteJob: update([Principal], Result(Job, JobHiringError), (id) => {
            const jobOpt = jobs.get(id);
            if ('None' in jobOpt) {
                return Err({
                    JobNotFound: id
                });
            }
            const job = jobOpt.Some;

            const companyOpt = companies.get(job.company);
            if ('None' in companyOpt) {
                return Err({
                    CompanyNotFound: job.company
                });
            }
            const company = companyOpt.Some;

            const updatedCompany: Company = {
                ...company,
                openJobIds: company.openJobIds.filter((jobId) => jobId !== id)
            };
            companies.insert(job.company, updatedCompany);

            jobs.remove(id);
            return Ok(job);
        }),
})


function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}