
import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

import console from "console";

     AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region : process.env.AWS_REGION,
      });

      // Create a DynamoDB document client to simplify working with items
      const client = new AWS.DynamoDB.DocumentClient();

      const params = {
        TableName: "client-gallery-db",
      };


// Handles GET requests to /api
export async function GET(request: Request) {
    
      try {
       const data = await client.scan(params).promise();
       // console.log(data.Items);
        const itemsObject = data.Items.reduce((obj, item) => {
            // Assume each item has a unique 'imageId' you want to use as the key
            obj[item.imageId] = item.description;
            return obj;
          }, {});
        //  console.log(itemsObject);
       return NextResponse.json(itemsObject);
      } catch (error) {
      //  console.error("DynamoDB error: ", error);
        // Return an error response
        return NextResponse.json({ error: "Failed to fetch data from DynamoDB" });
      }
 
}


export async function DELETE(request: NextRequest) {
  console.log("DELETE CALLED");
  const body = await request.json();
  console.log(body);
 
  const command = {
    TableName: "client-gallery-db",
    Key: {
      imageId: body.keys[0].imageId
    }
  };


  client.delete(command, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        return NextResponse.json({ error: "Failed to fetch data from DynamoDB" });
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        return NextResponse.json({ Message : "Delete success" });
    }
});
return NextResponse.json({ Message : "Outside" });
}


// Handles POST requests to /api
export async function POST(request: Request) {
  //  console.log("post called");
   
     // Parse JSON body from the request
    const body =  await request.json();
   // console.log("Request Body: ", body);
     // Use the parsed body to construct your DynamoDB request
    const params = {
        RequestItems: {
        "client-gallery-db": body.items.map(item => ({
            PutRequest: {
            Item: item,
            },
        })),
        },
    };
    
      try {
        const data = await client.batchWrite(params).promise();
      //  console.log("Batch write succeeded:", data);
        return NextResponse.json({
            'message' : "success",
        });
      } catch (error) {
     //  console.error("DynamoDB batch write error:", error);
        return NextResponse.json({
            'error' : "error",
        });
      }
 // return NextResponse.json({ message: "Hello World" });
}
