FROM python:3.10.8-alpine

ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . ./

EXPOSE 8000
