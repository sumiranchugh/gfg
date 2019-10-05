curl -X PUT "localhost:9200/products_index?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "filter": {
        "autocomplete_filter": {
          "type": "edge_ngram",
          "min_gram": "3",
          "max_gram": "40"
        }
      },
      "analyzer": {
        "pk_custom_analyzer": {
          "type":      "custom", 
          "tokenizer": "standard",
          "char_filter": [
            "html_strip"
          ],
          "filter": [
            "lowercase"
          ]
        },
        "autocomplete": {
          "filter": ["lowercase", "autocomplete_filter"],
          "type": "custom",
          "tokenizer": "whitespace"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "analyzer": "autocomplete"
      },
      "brand": {
        "type": "text",
        "analyzer": "autocomplete"
      },
      "id": {
        "type": "integer"
      },
      "desc": {
        "type": "text",
        "analyzer": "autocomplete"
      },
      "price": {
      	"type": "integer"
      },
      "currency": {
      	"type": "text"
      }
    }
  }
}
'
curl -XPOST 'http://localhost:9200/products_index/_bulk?pretty' -H 'Content-Type: application/json' --data-binary @products.json
