# Intro

A simple setup to enable GPU metric or error logs monitoring with CloudFormation template. 

## How to

* Refer to [EC2 Instance Template](./ec2-instance-cfn.yml) for more details
 * GPU monitoring is managed under `UserData` section in EC2 instance resource. ([code sample from](../nvidia-efa-ami_base/nvidia-efa-ml-ubuntu1804.yml)) If you want to bring your own AMI, please consider set up proper AMI id within your target AWS region - Parameter `LatestAmiId`
 * The default setup with CloudWatch Log Group Metric Filter can't capture log stream id (usually it's the instance id). You may consider customizing your log generation or using [SubscriptionFilter](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html).
  * A sample Node.js code has been attached as a reference, you may create the subscription filter in CloudWatch Log Group and create the related lambda function as the subscriber. Please place proper value for variable in the code: `region`, `account_id` & `topic_arn`.
* For verify your setting
 * You may manually add 'NVRM: Xid' like message into the target gpuerrors.log file or add log event to your stream.
