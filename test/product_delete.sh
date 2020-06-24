TOKEN=$1
PRODUCT_ID=$2

curl -X DELETE \
-H 'Accept: application/json' \
-H "Authorization: Bearer ${TOKEN}" \
http://localhost:8080/api/v1/product/${PRODUCT_ID}
