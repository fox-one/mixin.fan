from sanic import Sanic
from sanic.response import json
from sanic_cors import CORS
import json as jsonLib
import profit

app = Sanic("Calculator")


CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.post('/api/calc/earn/')
async def calc_earn(request):
    data = jsonLib.loads(str(request.body, 'utf-8'))
    prices = profit.calc_earn(**data)

    return json({'result': prices})

if __name__ == '__main__':
    app.run()
