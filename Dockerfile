FROM python:3.11-slim

RUN mkdir -p /home/travelapp
WORKDIR /home/travelapp
COPY . .

RUN apt-get update
RUN python3 -m venv .venv/
ENV PATH="/home/travelapp/.venv/bin:$PATH"

# Install Poetry within the virtual environment
RUN .venv/bin/pip install --upgrade pip \
    && .venv/bin/pip install poetry

# Install dependencies using Poetry
RUN .venv/bin/poetry install

ENV API_PORT=8000
EXPOSE $API_PORT

# Start the API using the specified port
CMD .venv/bin/python3 -m uvicorn src.main:app --host 0.0.0.0 --port $API_PORT --reload
#install docker: https://docs.docker.com/get-docker/
#docker build -t travelapp .
#docker run -d --name travelapp -p 8000:8000 --mount type=bind,source="$(pwd)/src",target=/home/travelapp/src travelapp
#docker logs -f travelapp