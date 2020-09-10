import { rest } from 'msw'
export const handlers = [
    rest.get('/api/wallets/:userid/', (req, res, ctx) => {
            return res(ctx.json([
                    {
                        "id": "AyMzv3EkKFzFG4H8HfEz",
                        "data": {
                            "currency": "GBP",
                            "balance": 1090
                        }
                    },
                    {
                        "id": "SPNFH5Q5pDLBbYOPrOd6",
                        "data": {
                            "currency": "EUR",
                            "balance": 0
                        }
                    },
                    {
                        "id": "amAienpx5MVa5EJkyJEc",
                        "data": {
                            "balance": "10",
                            "currency": "USD"
                        }
                    }
                ])
            )
        }
    )
]
