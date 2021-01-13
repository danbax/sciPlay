<?php
/**
 * Rest API
 */
define("RESULT_ERROR","ERROR");
define("RESULT_SUCCESS","OK");

include 'classes/JsonFactsSave.php';

$action = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_STRING);

/** initialize response json class */
$response = new stdClass();
$response->timestamp = strtotime("now");
$response->status = "";

if (!isset($action)) {
    $response->status = RESULT_ERROR;
    $response->error = "You must send action to the API";
    sendResponse($response);
}

switch ($action) {
    /**
     * save json to file
     * @json - json formatted facts
     */
    case 'saveJson' :
        /*
         * input: json
         */
        $json = filter_input(INPUT_POST, 'json', FILTER_DEFAULT);

        if(!isset($json)){
            $response->status = RESULT_ERROR;
            $response->error = "You must send all required data";
        }else{
            $factsSaver = new JsonFactsSave();
            if(!$factsSaver->save($json)){
                $response->status = RESULT_ERROR;
                $response->error = $factsSaver->getError();
            }
            else{
                $response->status = RESULT_SUCCESS;
            }
        }
        sendResponse($response);
        break;
    default:
		$response->status  = RESULT_ERROR;
		$response->error = 'Calling unknown function';
		sendResponse($response);
		break;
}

function sendResponse($response) {
	header("Content-type:application/json");
	echo json_encode($response, JSON_UNESCAPED_UNICODE);
	die;
}
