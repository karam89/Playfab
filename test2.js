handlers.sendFriendRequested = function (args)
{
	var messageGroupId = args.toId + "_friendRequests2";
	var playerData;
	try
	{
		playerData = server.GetUserReadOnlyData({"PlayFabId" : args.toId, "Keys" : ["hasFriendsRequestsSharedGroup"]});
	}
	catch(error)
	{
		playerData  = "hi from cloudscript";
	}
	return {groupId: messageGroupId, date: playerData};
	var dataPayload = {};
	var keyString = currentPlayerId;
	dataPayload[keyString] = "nice request";
	server.CreateSharedGroupData({
		SharedGroupId: messageGroupId
    });
	return {groupId: messageGroupId, keyString: keyString};
}
handlers.helloWorld = function (args)
{
	var playerData = server.GetUserReadOnlyData({"PlayFabId" : currentPlayerId, "Keys" : ["SaveState"]});
	var previousState = 0; //if we return a matching key-value pair, then we can proceed otherwise we will need to create a new record.
	log.info("will it log?");
	if(playerData.Data.hasOwnProperty("SaveState"))
	{
		previousState = parseInt(playerData.Data["SaveState"].Value);
	}
	var toSave = previousState+parseInt(args.toAdd);
	var result = server.UpdateUserReadOnlyData({"PlayFabId" : currentPlayerId, "Data" : {SaveState: toSave}, "Permission":"Public" });


//	info.log("or not?");
	
	var message = "Hello " + args.name + "!";
	return { messageValue: message, CPID:  currentPlayerId, name: args.name, a: previousState, z: toSave};
}