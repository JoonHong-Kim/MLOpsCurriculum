# 특정 유저의 돈을 다른 유저에게 전달하는 상황

## URI
```
POST /transaction
```

## Parameter
| Name      | Type  | Description | Required |
| --------- | :---: | :---------: | -------: |
| from_user | int  |  주는 유저 id |     True |
| to_user   | int  |  받는 유저 id |     True |
| money     |  int  |  보낼 금액  |     True |

## Response
| Name    | Type  | Description | Required |
| ------- | :---: | :---------: | -------: |
| success | bool  |  성공 여부  |     True |