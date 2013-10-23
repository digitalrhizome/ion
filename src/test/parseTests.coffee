ion = require '../'

parseTests =
    "    12": [12]
    "    foo": [op: 'ref',args: ['foo']]
    "    foo['bar']": [{"op": "member","args": [{"op": "ref","args": ["foo"]},"bar"]}]
    "    foo.bar": [{"op": "member","args": [{"op": "ref","args": ["foo"]},"bar"]}]
    "": []
    """

    """: []
    "    \"foo\"": ["foo"]
    "    \"\"\n        indented string\n            here.\n": ["indented string\n    here."]
    "    Person\n        name: \"Kris\"": [{"op":"object","args":[{"op":"ref","args":["Person"]},{"op":":","args":["name","Kris"]}]}]
    "    foo * 2": [{"op":"*","args":[{"op":"ref","args":["foo"]},2]}]
    "    Person\n        name: \"Kris\"\n        poem: \"\"\n            There once was a doctor from Mactus\n            who liked operating on cactus.\n            He had ants on his pants\n            after doing transplants\n            and finally got sued for malpractice.\n":
            [{"op":"object","args":[{"op":"ref","args":["Person"]},{op:"block",args:[{"op":":","args":["name","Kris"]},{"op":":","args":["poem","There once was a doctor from Mactus\nwho liked operating on cactus.\nHe had ants on his pants\nafter doing transplants\nand finally got sued for malpractice."]}]}]}]
exports.test =
    parse: ->
        for text, expected of parseTests
            result = ion._parse text
            if JSON.stringify(result) != JSON.stringify(expected)
                console.log "-----------------Parsing---------------"
                console.log text
                console.log "-----------------Result----------------"
                console.log JSON.stringify result
                console.log "-----------------Expected--------------"
                console.log JSON.stringify expected
                console.log "---------------------------------------"
                throw new Error JSON.stringify(result, null, '  ') + "\n!=\n" + JSON.stringify(expected, null, '  ')
        return
