#  Job Finder
### Created for dacade-challenge

Job Finder is a robust API for managing companies and their associated job postings akin
to GlassDoor. User can search to view company profile or get all jobs that are available
for them to apply. Job that has no longer offered can be removed.

The API systems offers the following services:
- createCompany: Creates a new company with the provided information.
- getCompanyById: Retrieves a company by its unique identifier.
- createJob: Creates a new job posting associated with a specific company.
- getJobById: Retrieves a job posting by its unique identifier.
- getJobsByCompany: Retrieves all job postings belonging to a specific company.
- getJobs: Retrieves all available job postings.
- deleteJob: Deletes a job posting by its unique identifier.

Use dfx version 0.16.1 
and typescript azle version 0.20.1

1. npm install
2. dfx start --clean --host 127.0.0.1:8000
3. in another terminal, dfx deploy