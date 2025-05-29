# Create Secret Key
Bu komut turn ve stun için kullanılan username ve passwordü üretiyor.
````
secret=mysecret && \
time=$(date +%s) && \
expiry=8400 && \
username=$(( $time + $expiry )) &&\
echo username:$username && \
echo password : $(echo -n $username | openssl dgst -binary -sha1 -hmac $secret | openssl base64)
````

# Docker Install
````
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce
sudo systemctl status docker
docker -v
````


# Docker Uninstall
````
sudo rm /usr/local/bin/docker-compose
pip uninstall docker-compose
````

# Docker Build
````
docker build -t web-rtc .
````

# Docker Run
````
docker run --net=host --name webrtccontainer -t web-rtc
````

# Run
````
node app.js
````

# Connect
````
http://localhost:3000
````
