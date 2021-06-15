setup:
	docker build -t web-rtc .
	docker run --net=host --name webrtccontainer -t web-rtc