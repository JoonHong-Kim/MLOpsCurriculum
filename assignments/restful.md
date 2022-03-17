# 특정 유저의 돈을 다른 유저에게 전달하는 상황

## URI
```
POST /money
```

## Parameter
| Name      | Type  | Description | Required |
| --------- | :---: | :---------: | -------: |
| from_user | User  |  주는 유저  |     True |
| to_user   | User  |  받는 유저  |     True |
| money     |  int  |  보낼 금액  |     True |

## Response
| Name    | Type  | Description | Required |
| ------- | :---: | :---------: | -------: |
| success | bool  |  성공 여부  |     True |