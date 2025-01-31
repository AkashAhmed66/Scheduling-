<?php

namespace App\Http\Controllers;

use App\Models\UploadModel;
use App\Http\Requests\StoreUploadModelRequest;
use App\Http\Requests\UpdateUploadModelRequest;
use App\Imports\QuestionImport;
use App\Models\AssesmentDocuments;
use App\Models\SupportingDocuments;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class UploadModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function upload(Request $request)
    {
        $file = $request->file('file');
        UploadModel::truncate();
        Excel::import(new QuestionImport, $file);
        return redirect()->back()->with('message', 'File uploaded and data inserted successfully.');
    }
    public function DeleteAssesment($id)
    {
        AssesmentDocuments::where('id', $id)->delete();
        return redirect()->back();
    }
    public function DeleteAssesmentSupporting($id)
    {
        SupportingDocuments::where('id', $id)->delete();
        return redirect()->back();
    }
    public function UploadAssesment(Request $request)
    {
        // Retrieve file from the request
        $file = $request->file('file');
    
        // Generate a timestamp-based filename
        $timestamp = now()->format('YmdHis');  // e.g., 20250117_143500
        $extension = $file->getClientOriginalExtension();
        $newFileName = "document_{$timestamp}.{$extension}";
    
        // Define the storage path
        $destinationPath = storage_path('app/public/assesment_documents');
    
        // Ensure the directory exists, create it if not
        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0777, true);
        }
    
        // Move the file to the specified directory
        $file->move($destinationPath, $newFileName);
    
        // Get the file path relative to the public directory
        $filePath = 'assesment_documents/' . $newFileName;
    
        // Prepare data for saving into the database
        $formData = [
            'documentName' => $request->input('documentName'),
            'fileName' => $request->input('fileName'),  // Store the new file name
            'jobId' => $request->input('jobId'),
            'teamId' => Auth::user()->team,
            'filePath' => $filePath, // Save the file path in the database
        ];
    
        // Create a new record in the 'assesment_documents' table
        AssesmentDocuments::create($formData);
    
        // Redirect back with a success message
        return redirect()->back()->with('message', 'File uploaded and data inserted successfully.');
    }
    public function UploadSupportingDoc(Request $request)
    {

        // dd($request->toArray());
        // Retrieve file from the request
        $file = $request->file('file');
    
        // Generate a timestamp-based filename
        $timestamp = now()->format('YmdHis');  // e.g., 20250117_143500
        $extension = $file->getClientOriginalExtension();
        $newFileName = "document_{$timestamp}.{$extension}";
    
        // Define the storage path
        $destinationPath = storage_path('app/public/assesment_documents');
    
        // Ensure the directory exists, create it if not
        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0777, true);
        }
    
        // Move the file to the specified directory
        $file->move($destinationPath, $newFileName);
    
        // Get the file path relative to the public directory
        $filePath = 'assesment_documents/' . $newFileName;
    
        // Prepare data for saving into the database
        $formData = [
            'name' => $request->input('documentName'),  // Store the new file name
            'jobId' => $request->input('jobId'),
            'teamId' => Auth::user()->team,
            'path' => $filePath, // Save the file path in the database
        ];
    
        // Create a new record in the 'assesment_documents' table
        SupportingDocuments::create($formData);
    
        // Redirect back with a success message
        return redirect()->back()->with('message', 'File uploaded and data inserted successfully.');
    }
    


    public function index()
    {
        $questions = UploadModel::get();
        $user = Auth::user();

        return Inertia::render('Assesment', [
            'question' => $questions,
            'user' => $user,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUploadModelRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(UploadModel $uploadModel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UploadModel $uploadModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUploadModelRequest $request, UploadModel $uploadModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UploadModel $uploadModel)
    {
        //
    }
}
