import CodeEditor from '@uiw/react-textarea-code-editor';
import React, { useState } from "react";
function FileEditor() {
  const [code, setCode] = React.useState(
    `package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"context"
	"time"

	"github.com/gorilla/mux"
	"t4/Model"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Users []User

var client *mongo.Client

func allUsers(w http.ResponseWriter, r *http.Request) {
	fmt.Println("allUsers")
	w.Header().Add("content-type", "application/json")

	var user User

	json.NewDecoder(r.Body).Decode(&user)
	var collection = client.Database("Account").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	res, _ := collection.InsertOne(ctx, user)
	json.NewEncoder(w).Encode(res)

}

func home(w http.ResponseWriter, r *http.Request) {
	fmt.Println("/home")
}

func main() {
	fmt.Println("d")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	defer cancel()

	r := mux.NewRouter()

	r.HandleFunc("/", home).Methods("GET")
	r.HandleFunc("/users", allUsers).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", r))
}`
  );


  return (
    <CodeEditor
      value={code}
      language="go"
      placeholder="Please enter JS code."
      onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      style={{
        fontSize: 12,
        backgroundColor: "#f5f5f5",
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
  );
}

export default FileEditor;