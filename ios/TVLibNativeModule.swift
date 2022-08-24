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
  @objc func tvSDKUpdateDeviceList(_ callback:RCTResponseSenderBlock){
     
    
    let deviceList = [DeviceModel(manufacturerName: "Withings", modelConnectivity: "WIFI", deviceName: "BPM Connect", deviceType: "BLOODPRESSURE", deviceSerialNo: "Withings-BP-123456", modelName: "WithingsM1", modelCode: "WithingsM12", modelMaxSupportedUsers: 1, deviceTimezone: "UTC", deviceIPAddress: "WithingsM1Device11", deviceMAC: "WithingsM1DeviceMAC11", deviceSSID: "PPOS12344", deviceBluetoothMAC: "WithingsM1DeviceBluetoothMAC11", deviceCellularNumber: "1234567889")]
    if let configTemp = TVLibNativeModule.tvConfig{
      configTemp.updateDevicesList(deviceList: deviceList) { deviceData in
        if let deviceInfo = deviceData{
          print("Partner App tvconfig updateDevicesList: \(deviceInfo)")
          self.updateDeviceListResp="Updated Successfully";
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
  
    callback([self.updateDeviceListResp]);
  }
  
  @objc func readVitalReading(){
    TVLibNativeModule.tvConfig?.scanFreestyleDevice()
  }
  
  
}

