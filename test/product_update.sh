TOKEN=$1
PRODUCT_ID=$2
NAME=$3
PRICE=$4
DESCRIPTION=$5

DATA='{"name": "'${NAME}'","price": '${PRICE}', "description": "'${DESCRIPTION}'"}'

echo $DATA

curl -X PUT -H 'Accept: application/json' \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${TOKEN}" \
--data  "${DATA}" \
http://localhost:8080/api/v1/product/${PRODUCT_ID}
