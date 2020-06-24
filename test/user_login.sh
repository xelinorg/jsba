USERNAME=$1
PASSWORD=$2
curl -X POST -H 'Accept: application/json' \
-H "Content-Type: application/json" \
--data '{"username": "'${USERNAME}'", "password": "'${PASSWORD}'"}' \
http://localhost:8080/api/v1/user/login
