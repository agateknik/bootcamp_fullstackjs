#!/bin/bash

BASE_URL="http://localhost:8000"
TIMESTAMP=$(date +%s)
EMAIL="test-${TIMESTAMP}@example.com"
PASSWORD="password123"

echo "🚀 Starting API Tests..."

# 1. Register
echo -n "1. Registering user... "
REGISTER_RES=$(curl -s -X POST "${BASE_URL}/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"${EMAIL}\", \"password\": \"${PASSWORD}\"}")

if echo "$REGISTER_RES" | grep -q '"success":true'; then
    echo "✅ Success"
else
    echo "❌ Failed: $REGISTER_RES"
    exit 1
fi

# 2. Login
echo -n "2. Logging in... "
LOGIN_RES=$(curl -s -X POST "${BASE_URL}/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"${EMAIL}\", \"password\": \"${PASSWORD}\"}")

TOKEN=$(echo "$LOGIN_RES" | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)

if [ -n "$TOKEN" ]; then
    echo "✅ Success (Token received)"
else
    echo "❌ Failed: $LOGIN_RES"
    exit 1
fi

# 3. Get Profile
echo -n "3. Getting profile... "
PROFILE_RES=$(curl -s -X GET "${BASE_URL}/profile/me" \
  -H "Authorization: Bearer ${TOKEN}")

if echo "$PROFILE_RES" | grep -q '"success":true'; then
    echo "✅ Success"
else
    echo "❌ Failed: $PROFILE_RES"
    exit 1
fi

# 4. Create Todo
echo -n "4. Creating todo... "
TODO_RES=$(curl -s -X POST "${BASE_URL}/todos" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Todo"}')

TODO_ID=$(echo "$TODO_RES" | grep -o '"id":"[^"]*' | cut -d'"' -f4)

if [ -n "$TODO_ID" ]; then
    echo "✅ Success (ID: $TODO_ID)"
else
    echo "❌ Failed: $TODO_RES"
    exit 1
fi

# 5. List Todos
echo -n "5. Listing todos... "
LIST_RES=$(curl -s -X GET "${BASE_URL}/todos" \
  -H "Authorization: Bearer ${TOKEN}")

if echo "$LIST_RES" | grep -q "\"id\":\"${TODO_ID}\""; then
    echo "✅ Success"
else
    echo "❌ Failed: $LIST_RES"
    exit 1
fi

# 6. Delete Todo
echo -n "6. Deleting todo... "
DELETE_RES=$(curl -s -X DELETE "${BASE_URL}/todos/${TODO_ID}" \
  -H "Authorization: Bearer ${TOKEN}")

if echo "$DELETE_RES" | grep -q '"success":true'; then
    echo "✅ Success"
else
    echo "❌ Failed: $DELETE_RES"
    exit 1
fi

echo "🎉 All tests passed!"
