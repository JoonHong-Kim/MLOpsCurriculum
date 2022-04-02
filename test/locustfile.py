from locust import HttpUser, task

class GetAllUser(HttpUser):
    @task
    def index(self):
        self.client.get("/")