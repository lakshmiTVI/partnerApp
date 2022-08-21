//
//  TVLibNativeModule.m
//  partnerApp
//
//  Created by Lakshmi Pawar on 19/08/22.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

 @interface  RCT_EXTERN_MODULE(TVLibNativeModule,NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date      callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(loginUser:(NSString *)userName password:(NSString *)password callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(greetings:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(configureTerra:(RCTResponseSenderBlock)callback)

+ (BOOL) requiresMainQueueSetup {
  return YES;
}

@end

