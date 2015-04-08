FROM python:2.7.9

MAINTAINER Sam Liu 

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN pip install -U pip

COPY requirements.txt /usr/src/app/

RUN pip install -r requirements.txt

ADD . /usr/src/app

# Fix: debian broken gevent.ssl by removing PROTOCOL_SSLv3
RUN sed -i 's/PROTOCOL_SSLv3/PROTOCOL_SSLv23/g' /usr/local/lib/python2.7/site-packages/gevent/ssl.py

EXPOSE 8010

CMD ["gunicorn", "-b", "0.0.0.0:8000", "-c", "config/gunicorn.py", "ology.wsgi:get_application()", "--log-level", "info"]
