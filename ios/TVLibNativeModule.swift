//
//  TVLibNativeModule.swift
//  partnerApp
//
//  Created by Lakshmi Pawar on 19/08/22.
//

import Foundation
import tvDeviceLibiOS


@available(iOS 13.0, *)
@objc(TVLibNativeModule)
public class TVLibNativeModule:NSObject{
  
  @objc var terraConfigResp=false;
  
  
  static var tvConfig:tvDeviceLibConfig?
  
  //MARK: TVDeviceLib Config Methods
  @objc func configureTVDeviceLib(_ email:String, platform:String, password:String,callback:RCTResponseSenderBlock){
    print("configureTVDeviceLib Start")

    ActivityIndicator.sharedInstance.showActivityIndicator()
    TVLibNativeModule.tvConfig = tvDeviceLibConfig.init(email: email, platform: platform, password: password) { userModel in
      print("configureTVDeviceLib Done")
          print("Partner App tvconfigs userModel: \(userModel)")
      self.terraConfigResp=true;
          ActivityIndicator.sharedInstance.hideActivityIndicator()
      
      } failure: { error in
          print("Partner App tvconfig error: \(error)")
          ActivityIndicator.sharedInstance.hideActivityIndicator()
      }
    sleep(3)
    
      callback([self.terraConfigResp])
    
  }
  
  
  @objc var updateDeviceListResp="Not updated";
  @objc var respList="";
  @objc func tvSDKUpdateDeviceList(_ deviceArr:NSArray, callback:RCTResponseSenderBlock){
     
    print(deviceArr);
    var deviceList1 = [DeviceModel]();
  
    for device in deviceArr {
          
      let deviceFinal=device as! NSDictionary;
      let make = (deviceFinal["make"] as? String) ?? ""
      let model = (deviceFinal["model"] as? String) ?? ""
      let serialnumber = (deviceFinal["serialnumber"] as? String) ?? ""
      let type = (deviceFinal["type"] as? String) ?? ""
      let name = (deviceFinal["name"] as? String) ?? ""
      
      var modelObj=DeviceModel(manufacturerName: make, modelConnectivity: "WIFI", deviceName: name, deviceType: type, deviceSerialNo: serialnumber, modelName: model, modelCode: "WithingsM12", modelMaxSupportedUsers: 1, deviceTimezone: "UTC", deviceIPAddress: "WithingsM1Device11", deviceMAC: "WithingsM1DeviceMAC11", deviceSSID: "PPOS12344", deviceBluetoothMAC: "WithingsM1DeviceBluetoothMAC11", deviceCellularNumber: "1234567889");

      deviceList1.append(modelObj);
      
    }
    
    if let configTemp = TVLibNativeModule.tvConfig{
      configTemp.updateDevicesList(deviceList: deviceList1) { deviceData in
        if let deviceInfo = deviceData{
          print("Partner App tvconfig updateDevicesList: \(deviceInfo)")
          
          self.updateDeviceListResp="Updated Successfully";
          self.respList=deviceInfo;
        }else{
          print("Partner App tvconfig updateDevicesList: No devices available")
          self.updateDeviceListResp="No devices available";
        }
      } failure: { error in
        print("Partner App tvconfig updateDevicesList error: \(error)")
        self.updateDeviceListResp="Error while updating device";
      }
    }
    
    sleep(3)
  
    print(self.respList);
    callback([[self.updateDeviceListResp , self.respList]]);
  }
  
  @objc func readVitalReading(){
    
    TVLibNativeModule.tvConfig?.scanFreestyleDevice()
  }
  
  
}

