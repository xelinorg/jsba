TOKEN=$1
PAGE_SIZE=$2
PAGE_OFFSET=$3
QUERY_PARAMS=''

NUMBER_RE='^[0-9]+$'

if [[ $PAGE_SIZE =~ $NUMBER_RE ]]
then
  QUERY_PARAMS="?size=${PAGE_SIZE}"
fi

if [[ $PAGE_OFFSET =~ $NUMBER_RE ]]
then
  if [[ -z $QUERY_PARAMS ]]
  then
    QUERY_PARAMS="?offset=${PAGE_OFFSET}"
  else
    QUERY_PARAMS="${QUERY_PARAMS}&offset=${PAGE_OFFSET}"
  fi
fi

echo $QUERY_PARAMS

curl -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" \
http://localhost:8080/api/v1/product${QUERY_PARAMS}
