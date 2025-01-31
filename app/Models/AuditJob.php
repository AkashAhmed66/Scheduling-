<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditJob extends Model
{
    /** @use HasFactory<\Database\Factories\AuditJobFactory> */
    use HasFactory;
    protected $table = 'audit_jobs';
    protected $fillable = [
        'jobType', 'reportNo', 'requestType', 'jobStatus', 'officeCountry', 'staffDays', 
        'isClientShadowAudit', 'dateRequestReceived', 'auditDueDate', 'auditStartDate', 'auditEndDate', 
        'remarks', 'dateReportSentToQA', 'finalReportSentToClient', 'role', 'user', 'staffDay', 
        'startDate', 'endDate', 'reportWriter', 'note', 'clientName', 'clientCity', 'clientProvince', 
        'clientCountry', 'clientPostalCode', 'clientAddress', 'clientTel', 'vendorName', 'vendorCity', 
        'vendorProvince', 'vendorCountry', 'vendorPostalCode', 'vendorAddress', 'vendorTel', 'factoryName', 
        'factoryCity', 'factoryProvince', 'factoryCountry', 'factoryPostalCode', 'factoryAddress', 'factoryTel', 
        'coordination', 'auditors', 'reportReview', 'team'
    ];
}
