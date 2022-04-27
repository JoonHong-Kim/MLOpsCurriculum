# Locust

## EC2

![Untitled](https://user-images.githubusercontent.com/30318926/162743272-e9bc6ff5-c3ef-4fe8-80ad-67277fd907c3.png)
![number_of_users_1649680374](https://user-images.githubusercontent.com/30318926/162743292-03c77ec3-05ad-4891-b586-8503c49617ba.png)
![response_times_(ms)_1649680374](https://user-images.githubusercontent.com/30318926/162743297-1e6f342c-1d58-4708-928f-e7bedfc31203.png)
![total_requests_per_second_1649680374](https://user-images.githubusercontent.com/30318926/162743298-029822e4-8cde-4da7-817a-ad22b36db1aa.png)

## ECS

![Untitled1](https://user-images.githubusercontent.com/30318926/162743381-9235e05e-a626-436b-953c-dd3258c11246.png)
![number_of_users_1649680858](https://user-images.githubusercontent.com/30318926/162743401-c77b9727-148c-458e-973c-5342fc870a7d.png)
![response_times_(ms)_1649680858](https://user-images.githubusercontent.com/30318926/162743405-1f379fa9-d435-452a-8a71-b2e685c465ed.png)
![total_requests_per_second_1649680858](https://user-images.githubusercontent.com/30318926/162743412-b7ae5f55-e2af-4087-a8ff-02d32ebb621a.png)

## 결과

- ECS는 fail 이 아예 없는 반면 EC2의 경우 종종 fail하는 경우가 발생함
- RPS를 비교해봤을 시 ECS가 EC2 보다 많은 user 처리 가능
- 다만 minimum response time 은 EC2가 더 빠른걸 보아 load balancing 같은 ECS task가 없는 EC2가 더 빠른것 같음.
