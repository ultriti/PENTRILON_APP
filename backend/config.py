from pymongo import MongoClient
import os

# Initialize client once
client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017/"))

def get_db():
    try:
        print("Connecting to MongoDB...")
        db = client["Pentrilon_AI_DB"]

        # Define schema validation
        user_schema = {
            "validator": {
                "$jsonSchema": {
                    "bsonType": "object",
                    "required": ["username", "email", "password", "isVerified"],
                    "properties": {
                        "username": {
                            "bsonType": "string",
                            "description": "must be a string and is required"
                        },
                        "email": {
                            "bsonType": "string",
                            "pattern": "^.+@.+\\..+$",
                            "description": "must be a valid email address and is required"
                        },
                        "password": {
                            "bsonType": "string",
                            "description": "must be a string (hashed) and is required"
                        },
                        "isVerified": {
                            "bsonType": "bool",
                            "description": "true if email is verified, false otherwise"
                        },
                        "verificationCode": {
                            "bsonType": ["string", "null"],
                            "description": "temporary code for email verification"
                        },
                        "expiresAt": {
                            "bsonType": ["date", "null"],
                            "description": "expiry timestamp for verification code"
                        }
                    }
                }
            }
        }

        # Try creating collection with schema
        try:
            db.create_collection("user", **user_schema)
            print("Created 'user' collection with schema validation.")
        except Exception as e:
            
            
            db.command({
                "collMod": "user",
                "validator": user_schema["validator"],
                "validationLevel": "moderate"
            })
            print("Updated 'user' collection with schema validation.")

        # Ensure unique index on email
        db["user"].create_index("email", unique=True)

        print("Collections:", db.list_collection_names())
        return db

    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return None
