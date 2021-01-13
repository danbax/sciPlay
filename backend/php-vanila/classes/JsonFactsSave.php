<?php
include('FilesWriter.php');

/**
 * update json file
 */

class JsonFactsSave extends FilesWriter {
    private $jsonFile = "facts.json";
	
    /**
     * Write facts to json
     * @param string $json
     */
    public function save($json) {
        if(!$this->isJson($json)){
            $this->setError("The json data is not valid");
            return false;
        }

        if(!$this->write($this->jsonFile,$json)){
            return false;
        }
        return true;    
    }

    /**
     * is the string is valid json
     * @param string $json
     */
    private function isJson($string) {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }
}