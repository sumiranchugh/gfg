export const data = {
    took: 1,
    timed_out: false,
    _shards: {
        total: 1,
        successful: 1,
        skipped: 0,
        failed: 0
    },
    hits: {
        total: {
            value: 1,
            relation: "eq"
        },
        max_score: 1.3862944,
        hits: [{
            _index: "twitter",
            _type: "_doc",
            _id: "0",
            _score: 1.3862944,
            _source: {
                id: 1,
                name: "test",
                brand: "hello"
            }
        }]
    }
}