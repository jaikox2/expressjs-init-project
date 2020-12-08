deploy:
	docker stack deploy -c docker-compose.yaml app

.PHONY: deploy