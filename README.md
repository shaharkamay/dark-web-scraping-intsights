# Dark Web Scraper - Intsights

## Description

A scraping, analysis and presentation platform to one of the most hideous places on the dark-web: The Stronghold Paste Site. This site contains a lot of criminal activity, ranging from illegal hacking and data theft attempts, through hitmans and other criminal services for sell and all the way to links to child pornography sites.

## Technologies

- Typescript
- Prisma
- MySql
- AWS - Lambda (through CDK)
- Web Sockets
- Docker
- React
- Browser Notification API
- NER - Named Entity Recognition

## Project Flow

![Diagram](https://i.ibb.co/48TRJ4P/Untitled-Diagram-drawio.png)

## Requirements

- [Stanford NER](https://nlp.stanford.edu/software/CRF-NER.shtml#:~:text=Download%20Stanford%20Named%20Entity%20Recognizer%20version%204.2.0)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker-Compose](https://docs.docker.com/compose/install/)

## Usage

1. Download Stanford Named Entity Recognizer version 4.x.x from [this link](https://nlp.stanford.edu/software/CRF-NER.shtml#:~:text=Download%20Stanford%20Named%20Entity%20Recognizer%20version%204.2.0), then extract the folder and copy all the files inside the folder, to this project's `stanford-ner` folder (keep the `ner-server` and `Dockerfile` inside as well).
2. Add `.env` file to `server` folder and define the database url:
   - `DATABASE_URL=<database_connection_string>`
3. To use the cdk add the same `.env` file inside `serverless/cdk`.
4. run the command:

   ```
   docker-compose up --build
   ```

5. Open [http://localhost:8081/](http://localhost:8081/) to open the app.
