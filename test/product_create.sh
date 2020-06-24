TOKEN=$1
NAME=$2
PRICE=$3
DESCRIPTION=$4

DATA='{"name": "'${NAME}'","price": '${PRICE}', "description": "'${DESCRIPTION}'"}'

curl -X POST -H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data "${DATA}" \
http://localhost:8080/api/v1/product/
