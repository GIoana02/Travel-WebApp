FROM python:3.11-slim

RUN mkdir -p /home/travelapp/src
COPY pyproject.toml /home/travelapp
WORKDIR /home/travelapp

RUN apt-get update
RUN python3 -m venv .venv/
ENV PATH="/home/travelapp/.venv/bin:$PATH"

# Install Poetry within the virtual environment
RUN .venv/bin/pip install --upgrade pip \
    && .venv/bin/pip install poetry

# Install dependencies using Poetry
RUN .venv/bin/poetry install


ENTRYPOINT [ ".venv/bin/python3", "-m", "uvicorn", "--host", "0.0.0.0", "src.main:app", "--reload" ]

#install docker: https://docs.docker.com/get-docker/
#docker build -t travelapp .
#docker run -d --name travelapp -p 8000:8000 --mount type=bind,source="$(pwd)/src",target=/home/travelapp/src travelapp
#docker logs -f blogapp