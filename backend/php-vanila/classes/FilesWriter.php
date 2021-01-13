<?php

/**
 * Handle file actions
 */

class FilesWriter {
    
    /**
     * is file exist
     * @param string $file
	   * @return boolean true if exist
     */
    private function checkFile($file) {
    	if (!file_exists($file)) {
        $this->setError('File not found: ' . $file);
        return false;
      }
    		
    	return true;
    }
    
    /**
     * Write data to file
     * @param string $file
     * @param string $content
     */
    public function write($file, $content = '', $fileOption = 'w+') {
        if(!$this->checkFile($file)){
          return false;
        }
    
        $handle = fopen($file, $fileOption);
        $fwrite = fwrite($handle, $content);

        if ($fwrite === false) {
          $this->setError("Error writing to file");
          return false;
        }

        fclose($handle);
        return true;
    }

    /**
     * Get content from file
     * @param string $file
     * @param int $length
     * @return string
     */
    public function read($file, $length = FILE_SIZE_FULL) {
      if(!$this->checkFile($file)){
        return false;
      }
    	
      $handle = fopen($file, (FILE_SIZE_FULL == $length ? filesize($file) : $length));
      return fread ($handle, $length);
    }

    /**
     * error setter
     */
    public function setError($error){
      $this->error = $error;
    }

    /**
     * get error
     */
    public function getError(){
      return $this->error;
    }
}