//
//  ActivityIndicator.swift
//  partnerApp
//
//  Created by Lakshmi Pawar on 24/08/22.
//


import UIKit

var activityView:UIView?
@available(iOS 13.0, *)
class ActivityIndicator: NSObject {
    static let sharedInstance = ActivityIndicator()
    
    func showActivityIndicator()
    {
        DispatchQueue.main.async {
            let keyWindow = UIApplication.shared.windows.filter {$0.isKeyWindow}.first
            
            if activityView == nil{
                activityView = UIView(frame: (keyWindow?.frame)!)
                activityView?.backgroundColor = UIColor.black
                activityView?.alpha  = 0.6
                let activity = UIActivityIndicatorView.init(style: .medium)
                activity.color = .white
                activity.center = (activityView?.center)!
                activity.startAnimating()
                activityView?.addSubview(activity)
                keyWindow?.addSubview(activityView!)
            }
        }
    }
    func showActivityIndicatorOnView(_ view: UIView)
    {
        DispatchQueue.main.async {
            if activityView == nil{
                activityView = UIView(frame: (view.frame))
                activityView?.backgroundColor = UIColor.black
                activityView?.alpha  = 0.6
                let activity = UIActivityIndicatorView.init(style: .medium)
                activity.color = .white
                activity.center = (activityView?.center)!
                activity.startAnimating()
                activityView?.addSubview(activity)
                view.addSubview(activityView!)
            }
        }
    }
    func hideActivityIndicator()
    {
        DispatchQueue.main.async {
            if activityView != nil{
                activityView?.removeFromSuperview()
                activityView = nil
            }
        }
    }
}
