FROM python:3.10.8-alpine

ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000
