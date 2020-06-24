TOKEN=$1
curl -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" \
http://localhost:8080/api/v1/product
