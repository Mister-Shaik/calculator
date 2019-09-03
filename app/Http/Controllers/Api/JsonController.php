<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class JsonController extends Controller
{

    public function AddReport(Request $request)
    {
        $name =  $request->name;
        $date = $request->date;

        $file = file_get_contents(base_path('/resources/js/components/reports.json', true));
        $data = json_decode($file,true);
        unset($file);

        //you need to add new data as next index of data.
        $data[] = array('name' => $name, 'date' => $date);
        $result=json_encode($data);
        file_put_contents(base_path('/resources/js/components/reports.json'), $result);
        unset($result);

        return $data;
        
    }

    public function DelReport(Request $request)
    {
        $name =  $request->name;

        $file = file_get_contents(base_path('/resources/js/components/reports.json', true));
        $data = json_decode($file,true);
        unset($file);
        $i = 0;
        foreach($data as $element) {
            //check the property of every element
            if($name == $element['name']){
               unset($data[$i]);
            }
            $i++;
         }

        $result=json_encode($data);
        file_put_contents(base_path('/resources/js/components/reports.json'), $result);
        unset($result);


        //--------------------------------------------------------
        $file = file_get_contents(base_path('/resources/js/components/calculations.json', true));
        $data = json_decode($file,true);
        unset($file);
        
        foreach($data as $key=> $value) {
            //check the property of every element
            if($name == $key){
               unset($data[$key]);
            }
         }

        $result=json_encode($data);
        file_put_contents(base_path('/resources/js/components/calculations.json'), $result);
        unset($result);

        return $data;
    }
    
    public function AddCalculation(Request $request)
    {
        $report = $request->report;
        $id = $request->id;
        $calculation = $request->calculation;
        $name = $request->name;
        $total = $request->total;

        $file = file_get_contents(base_path('/resources/js/components/calculations.json', true));
        $data = json_decode($file,true);
        $rep = isset($data[$report]) ? $data[$report] : [];
        unset($file);

        //you need to add new data as next index of data.
        $rep[] = array('id' => $id, 'calculation' => $calculation, 'name' => $name, 'total' => $total);
        $data[$report] = is_array($rep) ? $rep : [$rep];
        $result=json_encode($data);
        file_put_contents(base_path('/resources/js/components/calculations.json'), $result);
        unset($result);

        return $data;
    }   

    public function DelCalculation(Request $request)
    {
        $report = $request->report;
        $id = $request->id;

        $file = file_get_contents(base_path('/resources/js/components/calculations.json', true));
        $data = json_decode($file,true);
        $rep = isset($data[$report]) ? $data[$report] : [];
        unset($file);

        $i = 0;
        foreach($rep as $element) {
            //check the property of every element
            if($id == $element['id']){
                array_splice($rep, $i, 1);
                break;
            }
            $i++;
        }
        $res = [];
        foreach($rep as $key=>$value){
            array_push($res, $value);
        }
        //you need to add new data as next index of data.
        $data[$report] = is_array($res) ? $rep : [$res];

        $result=json_encode($data);
        file_put_contents(base_path('/resources/js/components/calculations.json'), $result);
        unset($result);

        return $data;
    }

}
