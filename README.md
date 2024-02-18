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

### Installation
1. Clone this repository
```
git clone https://github.com/vncnttan/dacade-challenge.git
```
2. Use nvm and Node.js 20
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
```
nvm install 20
```


3. Make sure when you check the node version using `node --version` it shows `v20.x.x`

4. Use dfx version 0.16.1
```
DFX_VERSION=0.16.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```
5. Run 
```
npm install
```

6. Make sure when running command `dfx --version` it gives `dfx 0.16.1`

### Set Up
1. in a WSL dfx start --clean --host 127.0.0.1:8000
2. in another WSL terminal, dfx deploy