//
//  TVLibNativeModule.swift
//  partnerApp
//
//  Created by Lakshmi Pawar on 19/08/22.
//

import Foundation
import TerraiOS
@available(iOS 13.0.0, *)
@objc(TVLibNativeModule)
public class TVLibNativeModule:NSObject{
  
 
  @objc var terraResp=false;
  @objc
  public func configureTerra(_ callback:RCTResponseSenderBlock)
  {
    
    //MARK: SANDBOX (Terra-testing)
    let DEVID = "digivital-dev-eWzJZIbNW4"
    let XAPIKEY = "08a926b1f67f0f579c3f23467a97cdb84e99c84fcbaa04b6be0eda92530a37c2"
   
    if(!self.terraResp)
    {
    let terraClient =  Terra(devId: DEVID, referenceId: "ReferenceTvUser",completion: { (success) -> Void in
      
      print("Terra Configured");
      self.terraResp=success;
     
          
    });
   
      sleep(3)
    
    if(self.terraResp) {callback(["Terra is configured"]);}
    else {callback(["Terra is not Configured"]);}
    }
    else
      
    {
      callback(["Terra is already Configured"]);
    }
  }
  @objc
  public func loginUser(_ userName:String, password:String,callback:RCTResponseSenderBlock)
  {
       
    if(userName=="Televital" && password=="Televital@123")
    {
        callback(["Login Success"])
      
    }
    else
    {
      callback(["Invalid UserName or Password"])
    }
    
  }
  
  @objc
  public func addEvent(_ name: String, location: String, date: NSNumber,callback:RCTResponseSenderBlock) {
    callback ([[name,location,date]])
   }
  
   @objc
  public func constantsToExport() -> [String: Any]! {
      
     return ["someKey": "someValue"]
   }

  @objc
  public func greetings(_ callback:RCTResponseSenderBlock){
    callback(["Welcome to wrapper module"])
  }
  

}

