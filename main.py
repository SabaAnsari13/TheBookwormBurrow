from fastapi import FastAPI, HTTPException
import asyncpg
from pydantic import BaseModel

app = FastAPI()

# Database connection details
DB_USER = "postgres"
DB_PASSWORD = "pOst13"
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "DevO"

# Database connection setup
async def connect_to_db():
    return await asyncpg.connect(
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME
    )

# Model for login data
class LoginData(BaseModel):
    username: str
    password: str

# Route to handle user registration
@app.post("/register")
async def register_user(data: LoginData):
    try:
        async with connect_to_db() as connection:
            query = "INSERT INTO Users (username, password, email) VALUES ($1, $2, $3)"
            await connection.execute(query, data.username, data.password)
            return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error registering user: {str(e)}")

# Additional routes and application logic can be added here

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

