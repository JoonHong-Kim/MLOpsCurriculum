from locust import HttpUser, task
import random
class GetAllUser(HttpUser):
    @task
    def index(self):
        self.client.get("/user")

    @task
    def create_user(self):
        self.client.post("/user", json={"name": "test_user_" + str(random.randint(1, 9999999999999)),"age":27})