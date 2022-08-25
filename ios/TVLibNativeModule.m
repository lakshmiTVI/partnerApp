//
//  TVLibNativeModule.m
//  partnerApp
//
//  Created by Lakshmi Pawar on 19/08/22.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

 @interface  RCT_EXTERN_MODULE(TVLibNativeModule,NSObject)

RCT_EXTERN_METHOD(initTVDeviceLib:(NSString *)email platform:(NSString *)platform  password:(NSString *)password callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(tvDeviceLibUpdateDeviceList:(NSArray *)deviceArr callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(readVitalReading)

+ (BOOL) requiresMainQueueSetup {
  return YES;
}

@end

