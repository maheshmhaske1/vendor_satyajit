var vendor = {
    base_url: null,
    id: null,
    is_ban: false,
    is_final: false,
    is_valid: false,

    init: function () {
        vendor.bind_events()
        vendor.list_vendor()
        vendor.load_admin_role(0)






    },
    bind_events: function (e) {
    },
    list_vendor: function (e) {
        var level_status = 0
        if (sessionStorage.getItem("user_status") == "Initiator Login") {
            level_status = 1
        }

        else if (sessionStorage.getItem("user_status") == "SCM Head") {
            level_status = 2
        } else if (sessionStorage.getItem("user_status") == "Finance Compliance Verification") {
            level_status = 3
        } else if (sessionStorage.getItem("user_status") == "IT Team") {
            level_status = 4
        } else if (sessionStorage.getItem("user_status") == "CFO") {
            level_status = 5

        } else {
            level_status = 0

        }
        $('#vendor_table').DataTable({
            "ajax": {
                "url": this.base_url + `/vendor/list_vendor_by_status/${level_status}/0`,
                "type": "GET",
                "datatype": "json"
            },
            "buttons": [
                {
                    extend: 'excelHtml5',
                    text: 'Export to Excel',
                    exportOptions: {
                        columns: [1, 2, 3, 4] // indexes of the columns to export
                    }
                }
            ], "columns": [
                {
                    'data': '_id',
                    'visible': false
                },
                {
                    'data': null,
                    'sTitle': 'Sr.no',

                },
                {
                    'data': 'name',
                    'sTitle': 'Name',
                    'render': function (data, type, row) {

                        if (data == null || data == "") {
                            return '-';
                        } else {
                            return data;
                        }

                    }

                },

                // {
                //     'data': 'username',
                //     'sTitle': 'Username',
                //     'render': function (data, type, row) {

                //         if (data == null || data == "") {
                //             return '-';
                //         } else {
                //             return data;
                //         }

                //     }

                // },
                // {
                //     'data': 'mobile_number',
                //     'sTitle': 'Mobile Number',
                //     'render': function (data, type, row) {

                //         if (data == null || data == "") {
                //             return '-';
                //         } else {
                //             return data;
                //         }

                //     }

                // },
                {
                    'data': 'email',
                    'sTitle': 'Email',
                    'render': function (data, type, row) {

                        if (data == null || data == "") {
                            return '-';
                        } else {
                            return data;
                        }

                    }

                },
                {
                    'data': 'firm_type',
                    'sTitle': 'Firm Type',
                    'render': function (data, type, row) {

                        if (data == null || data == "") {
                            return '-';
                        } else {
                            if (data == 0) {

                            } else if (data == 1) {
                                return "Proprietorship"
                            } else if (data == 2) {
                                return "Partnership"
                            } else if (data == 3) {
                                return "Private Ltd"
                            } else {
                                return "Public Ltd"
                            }
                        }

                    }

                },
                {
                    'data': 'remark',
                    'sTitle': 'Status',
                    'render': function (data, type, row) {

                        if (data == null || data == "") {
                            return '-';
                        } else {
                            return data;
                        }

                    }

                },

                {
                    'data': 'download_attachment',
                    'visible': false,
                    'class': 'download_attachment',
                },

                {
                    'data': '_id',
                    'sTitle': 'View',
                    'class': 'center',
                    'render': function (data, type, row) {
                        var it_csv = ""
                        if (level_status == 4) {

                            it_csv = `<a href="vendor/download_pdf_it_csv/${data}"><i class="mdi mdi-file-document-box mx-2" title="Download CSV"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        } else {
                            it_csv = ""
                        }
                        return ` <i class="mdi mdi-eye mx-2" title="View" onclick="vendor.view_vendor(this)"   style="font-size:24px;color:#4B49AC; cursor: pointer;"></i>  <i class="mdi mdi-timer mx-2" title="Timeline"  style="font-size:24px;color:#4B49AC;cursor: pointer;" onclick="vendor.view_time_line(this)"></i><a href="vendor/download_pdf_it/${data}"><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a> ${it_csv}`
                        // var downloadAttachment = row['download_attachment'];
                        // if (downloadAttachment == "" || downloadAttachment == undefined) {
                        // } else {
                        //     return ` <i class="mdi mdi-eye mx-2" title="View" onclick="vendor.view_vendor(this)"   style="font-size:24px;color:#4B49AC; cursor: pointer;"></i>  <i class="mdi mdi-timer mx-2" title="Timeline"  style="font-size:24px;color:#4B49AC;cursor: pointer;" onclick="vendor.view_time_line(this)"></i><a href="${vendor.base_url}/files/${downloadAttachment}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a> ${it_csv}`

                        // }
                    }
                }


                ,
                {
                    'data': 'operator_by',
                    'sTitle': 'Action',
                    //'class': 'center',
                    'render': function (data, type, row) {

                        if (data == "" || data == null || data == undefined) {
                            return '<i class="mdi mdi-account-check mx-2"  onclick="vendor.forward(this)" title="Forward"   style="font-size:24px;color:#4B49AC; cursor: pointer;"></i>  <i class="mdi mdi-account-remove mx-2 it_team_remove"   style="font-size:24px;color:red;cursor:pointer" onclick="vendor.revert(this)" title="Revert"></i>'
                        } else {
                            if (data._id == sessionStorage.getItem("user_id")) {

                                if (sessionStorage.getItem("user_status") == "IT Team") {

                                    return '<i class="mdi mdi-account-check mx-2"  onclick="vendor.forward(this)" title="Forward"   style="font-size:24px;color:#4B49AC; cursor: pointer;"></i> '
                                } else {
                                    return '<i class="mdi mdi-account-check mx-2"  onclick="vendor.forward(this)" title="Forward"   style="font-size:24px;color:#4B49AC; cursor: pointer;"></i>  <i class="mdi mdi-account-remove mx-2 it_team_remove"   style="font-size:24px;color:red;cursor:pointer" onclick="vendor.revert(this)" title="Revert"></i>'


                                }

                            } else if (sessionStorage.getItem("user_status") == "Super Admin") {
                                return '<i class="mdi mdi-account-check mx-2"  onclick="vendor.forward(this)" title="Forward"   style="font-size:24px;color:#4B49AC; cursor: pointer;"></i>  <i class="mdi mdi-account-remove mx-2 it_team_remove"   style="font-size:24px;color:red;cursor:pointer" onclick="vendor.revert(this)"  title="Revert"></i>'

                            }
                            else {
                                return "-"
                            }
                        }

                    }
                }





            ],
            "rowCallback": function (nRow, aData, iDisplayIndex) {
                var oSettings = this.fnSettings();
                $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
                return nRow;
            },
        });



    },
    load_all_action: function (id) {

        $('#all_action').DataTable({
            "ajax": {
                "url": this.base_url + `/vendor/list_all_approval_by_id/${id}`,
                "type": "GET",
                "datatype": "json"
            },
            "buttons": [
                {
                    extend: 'excelHtml5',
                    text: 'Export to Excel',
                    exportOptions: {
                        columns: [1, 2, 3, 4] // indexes of the columns to export
                    }
                }
            ], "columns": [
                {
                    'data': '_id',
                    'visible': false
                },
                {
                    'data': null,
                    'sTitle': 'Sr.no',

                },
                {
                    'data': 'type',
                    'sTitle': 'Status',
                    'render': function (data, type, row) {

                        if (data == null || data == "") {
                            return '-';
                        } else {
                            return data;
                        }

                    }

                },
                {
                    'data': 'operator_by',
                    'sTitle': 'Operator Name',
                    'render': function (data, type, row) {

                        if (data == null || data == "") {
                            return '-';
                        } else {
                            return data.name;
                        }

                    }

                },
                {
                    'data': 'operator_by',
                    'sTitle': 'Operator Status',
                    'render': function (data, type, row) {

                        if (data == null || data == "") {
                            return '-';
                        } else {
                            return data.user_status;
                        }

                    }

                },


                {
                    'data': 'forwarded_to',
                    'sTitle': 'Forwarded Name',
                    'render': function (data, type, row) {

                        if (data == null || data == "") {
                            return '-';
                        } else {
                            return data.name;
                        }

                    }

                },
                {
                    'data': 'forwarded_to',
                    'sTitle': 'Forwarded Status',
                    'render': function (data, type, row) {

                        if (data == null || data == "") {
                            return '-';
                        } else {
                            return data.user_status;
                        }

                    }

                },

                {
                    'data': 'remark',
                    'sTitle': 'Remark',
                    'render': function (data, type, row) {

                        if (data == null || data == "") {
                            return '-';
                        } else {
                            return data;
                        }

                    }

                },







            ],
            "rowCallback": function (nRow, aData, iDisplayIndex) {
                var oSettings = this.fnSettings();
                $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
                return nRow;
            },
        });



    },


    view_vendor: function (e) {
        let self = this;
        let row = $(e).closest('tr');
        let obj = $('#vendor_table').dataTable().fnGetData(row);
        var id = obj._id



        var $request = $.ajax({
            url: `${vendor.base_url}/vendor/get_firm_data_by_vendor_id/${id}`,
            type: "GET",
            dataType: "json",
            contentType: "application/json",

        });

        $request.done(function (data) {

            if (data.status) {


                var info = data.data[0]

                console.log(info)


                $("#vendor_name").text(info.vendor_id.name ? info.vendor_id.name : "-")
                $("#mobile_number").val(info.vendor_id.mobile_number ? info.vendor_id.mobile_number : "")
                $("#name").val(info.vendor_id.name ? info.vendor_id.name : "")

                $("#email").val(info.vendor_id.email ? info.vendor_id.email : "")
                $("#firm_type").val(info.vendor_id.firm_type ? info.vendor_id.firm_type : "")
                $("#address").val(info.address ? info.address : "")
                $("#state").val(info.state ? info.state : "")
                $("#address1").val(info.address1 ? info.address1 : "")
                $("#zip_code").val(info.zip_code ? info.zip_code : "")
                $("#city").val(info.city ? info.city : "")
                $("#city1").val(info.city1 ? info.city1 : "")
                $("#gst_number").val(info.gst_number ? info.gst_number : "")
                $("#pan_card_number").val(info.pan_card_number ? info.pan_card_number : "")
                $("#bank_name").val(info.bank_name ? info.bank_name : "")
                $("#account_no").val(info.account_no ? info.account_no : "")
                $("#bank_address").val(info.bank_address ? info.bank_address : "")
                $("#ifsc_code").val(info.ifsc_code ? info.ifsc_code : "")
                $("#d_name").val(info.d_name ? info.d_name : "")
                $("#d_contact").val(info.d_contact ? info.d_contact : "")
                $("#d_email").val(info.d_email ? info.d_email : "")
                $("#s_name").val(info.s_name ? info.s_name : "")
                $("#s_number").val(info.s_number ? info.s_number : "")
                $("#s_email").val(info.s_email ? info.s_email : "")
                $("#p_name").val(info.p_name ? info.p_name : "")
                $("#p_contact").val(info.p_contact ? info.p_contact : "")
                $("#p_email").val(info.p_email ? info.p_email : "")
                $("#p_designation").val(info.p_designation ? info.p_designation : "")
                $("#p_alternate_contact").val(info.p_alternate_contact ? info.p_alternate_contact : "")
                $("#p_alternate_email").val(info.p_alternate_email ? info.p_alternate_email : "")
                $("#country").val(info.country ? info.country : "")


                // -------new filed-------------------//
                $("#mode_of_payment").val(info.mode_of_payment ? info.mode_of_payment : "")
                $("#micr_code").val(info.micr_code ? info.micr_code : "")
                $("#default_currency").val(info.default_currency ? info.default_currency : "")
                $("#incoterms_location").val(info.incoterms_location ? info.incoterms_location : "")
                $("#gst_range").val(info.gst_range ? info.gst_range : "")
                $("#gst_division").val(info.gst_division ? info.gst_division : "")
                $("#gst_commissionerate").val(info.gst_commissionerate ? info.gst_commissionerate : "")
                $("#hsn_sac").val(info.hsn_sac ? info.hsn_sac : "")
                $("#msme_no").val(info.msme_no ? info.msme_no : "")
                $("#ssi_no").val(info.ssi_no ? info.ssi_no : "")
                $("#payment_terms").val(info.payment_terms ? info.payment_terms : "")

                $("#accounting_ref").val(info.accounting_ref ? info.accounting_ref : "")
                $("#sales_ref").val(info.sales_ref ? info.sales_ref : "")
                $("#delivery_terms").val(info.delivery_terms ? info.delivery_terms : "")
                $("#financial_supplier").val(info.financial_supplier ? info.financial_supplier : "")
                $("#s_name_as_per_name").val(info.s_name_as_per_name ? info.s_name_as_per_name : "")
                $("#supplier_type").val(info.supplier_type ? info.supplier_type : "")
                $("#type_of_item").val(info.type_of_item ? info.type_of_item : "")









                var value = info.country

                if (value != "") {
                    if (value == "India") {

                    } else {
                        $(".ifsc_label").text("Swift Code")
                    }

                }





                var img = ""


                if (info.gst_url.length > 0) {

                    info.gst_url.map(info => {
                        var ex = info.split('.').pop()

                        if (ex == "mp4") {
                            img += `<div class="mx-1 remove_img_section gst_array_class"><img src="images/video.jpg" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                       
                        </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        } else if (ex == "pdf") {
                            img += `<div class="mx-1 remove_img_section gst_array_class"><a href="${vendor.base_url}/files/${info}" target="_blank"><img src="images/pdf.png" class="get_img_section" data-img='${info}'    width=100px alt="Img"></a>
                       
                        </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        }
                        else {
                            img += `<div class="mx-1 remove_img_section gst_array_class"><img src="${vendor.base_url}/files/${info}" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                   
                    </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`

                        }


                    })


                }
                $("#gst_documents_section").html("")
                $("#gst_documents_section").append(img)




                var img = ""


                if (info.pan_url.length > 0) {

                    info.pan_url.map(info => {
                        var ex = info.split('.').pop()

                        if (ex == "mp4") {
                            img += `<div class="mx-1 remove_img_section pan_array_class"><img src="images/video.jpg" class="get_img_section" data-img='${info}'   width=100px alt="Img">

                        </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        } else if (ex == "pdf") {
                            img += `<div class="mx-1 remove_img_section gst_array_class"><a href="${vendor.base_url}/files/${info}" target="_blank"><img src="images/pdf.png" class="get_img_section" data-img='${info}'    width=100px alt="Img"></a>
                       
                            </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        }
                        else {
                            img += `<div class="mx-1 remove_img_section pan_array_class"><img src="${vendor.base_url}/files/${info}" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                   
                    </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`

                        }

                    })

                }
                $("#pan_documents_section").html("")
                $("#pan_documents_section").append(img)



                var img = ""
                if (info.noc_url.length > 0) {

                    info.noc_url.map(info => {
                        var ex = info.split('.').pop()
                        if (ex == "mp4") {
                            img += `<div class="mx-1 remove_img_section noc_array_class"><img src="images/video.jpg" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                            
                            </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        } else if (ex == "pdf") {
                            img += `<div class="mx-1 remove_img_section gst_array_class"><a href="${vendor.base_url}/files/${info}" target="_blank"><img src="images/pdf.png" class="get_img_section" data-img='${info}'    width=100px alt="Img"></a>
                       
                        </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        }
                        else {
                            img += `<div class="mx-1 remove_img_section noc_array_class"><img src="${vendor.base_url}/files/${info}" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                       
                        </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`

                        }

                    })


                }
                $("#noc_documents_section").html("")
                $("#noc_documents_section").append(img)


                var img = ""

                var html = ""
                if (info.cheque_url.length > 0) {
                    info.cheque_url.map(info => {
                        var ex = info.split('.').pop()

                        if (ex == "mp4") {
                            img += `<div class="mx-1 remove_img_section cheque_array_class"><img src="images/video.jpg" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                       
                        </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        } else if (ex == "pdf") {
                            img += `<div class="mx-1 remove_img_section gst_array_class"><a href="${vendor.base_url}/files/${info}" target="_blank"><img src="images/pdf.png" class="get_img_section" data-img='${info}'    width=100px alt="Img"></a>
                       
                        </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        }
                        else {
                            img += `<div class="mx-1 remove_img_section cheque_array_class"><img src="${vendor.base_url}/files/${info}" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                    
                    </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`

                        }



                    })




                }
                $("#cheque_documents_section").html("")
                $("#cheque_documents_section").append(img)



                var img = ""


                if (info.msme_attachment.length > 0) {

                    info.msme_attachment.map(info => {
                        var ex = info.split('.').pop()

                        if (ex == "mp4") {
                            img += `<div class="mx-1 remove_img_section pan_array_class"><img src="images/video.jpg" class="get_img_section" data-img='${info}'   width=100px alt="Img">

                        </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        } else if (ex == "pdf") {
                            img += `<div class="mx-1 remove_img_section gst_array_class"><a href="${vendor.base_url}/files/${info}" target="_blank"><img src="images/pdf.png" class="get_img_section" data-img='${info}'    width=100px alt="Img"></a>
                       
                            </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        }
                        else {
                            img += `<div class="mx-1 remove_img_section pan_array_class"><img src="${vendor.base_url}/files/${info}" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                   
                    </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`

                        }

                    })

                }
                $("#msme_documents_section").html("")
                $("#msme_documents_section").append(img)





                var img = ""


                if (info.ssi_attachment.length > 0) {

                    info.ssi_attachment.map(info => {
                        var ex = info.split('.').pop()

                        if (ex == "mp4") {
                            img += `<div class="mx-1 remove_img_section pan_array_class"><img src="images/video.jpg" class="get_img_section" data-img='${info}'   width=100px alt="Img">

                        </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        } else if (ex == "pdf") {
                            img += `<div class="mx-1 remove_img_section gst_array_class"><a href="${vendor.base_url}/files/${info}" target="_blank"><img src="images/pdf.png" class="get_img_section" data-img='${info}'    width=100px alt="Img"></a>
                       
                            </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        }
                        else {
                            img += `<div class="mx-1 remove_img_section pan_array_class"><img src="${vendor.base_url}/files/${info}" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                   
                    </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`

                        }

                    })

                }
                $("#ssi_documents_section").html("")
                $("#ssi_documents_section").append(img)



                var img = ""


                if (info.code_of_conduct_attachment.length > 0) {

                    info.code_of_conduct_attachment.map(info => {
                        var ex = info.split('.').pop()

                        if (ex == "mp4") {
                            img += `<div class="mx-1 remove_img_section pan_array_class"><img src="images/video.jpg" class="get_img_section" data-img='${info}'   width=100px alt="Img">

                        </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        } else if (ex == "pdf") {
                            img += `<div class="mx-1 remove_img_section gst_array_class"><a href="${vendor.base_url}/files/${info}" target="_blank"><img src="images/pdf.png" class="get_img_section" data-img='${info}'    width=100px alt="Img"></a>
                       
                            </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        }
                        else {
                            img += `<div class="mx-1 remove_img_section pan_array_class"><img src="${vendor.base_url}/files/${info}" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                   
                    </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`

                        }

                    })

                }
                $("#code_of_conduct_attachment").html("")
                $("#code_of_conduct_attachment").append(img)



                var img = ""


                if (info.it_deceleration_attachment.length > 0) {

                    info.it_deceleration_attachment.map(info => {
                        var ex = info.split('.').pop()

                        if (ex == "mp4") {
                            img += `<div class="mx-1 remove_img_section pan_array_class"><img src="images/video.jpg" class="get_img_section" data-img='${info}'   width=100px alt="Img">

                        </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        } else if (ex == "pdf") {
                            img += `<div class="mx-1 remove_img_section gst_array_class"><a href="${vendor.base_url}/files/${info}" target="_blank"><img src="images/pdf.png" class="get_img_section" data-img='${info}'    width=100px alt="Img"></a>
                       
                            </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                        }
                        else {
                            img += `<div class="mx-1 remove_img_section pan_array_class"><img src="${vendor.base_url}/files/${info}" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                   
                    </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`

                        }

                    })

                }
                $("#it_deceleration_attachment").html("")
                $("#it_deceleration_attachment").append(img)


                var html = ""
                var add_more = ""

                if (info.contact_section_data.length > 0) {

                    info.contact_section_data.map((data, i) => {

                        var pan_section = ""
                        if (data.pan_url.length > 0) {
                            data.pan_url.map(img_url => {
                                var ex = img_url.split('.').pop()

                                if (ex == "mp4") {
                                    pan_section += `<div class="mx-1 remove_img_section pan_array_class_property"><img src="images/video.jpg" class="get_img_section" data-img='${img_url}'   width=100px alt="Img">
                            
                              </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                                } else if (ex == "pdf") {
                                    pan_section += `<div class="mx-1 remove_img_section gst_array_class"><a href="${vendor.base_url}/files/${img_url}" target="_blank"><img src="images/pdf.png" class="get_img_section" data-img='${img_url}'    width=100px alt="Img"></a>
                       
                        </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`
                                }
                                else {
                                    pan_section += `<div class="mx-1 remove_img_section pan_array_class_property"><img src="${vendor.base_url}/files/${img_url}" class="get_img_section" data-img='${img_url}'   width=100px alt="Img">
                          
                          </div><a href="${vendor.base_url}/files/${info}" download><i class="mdi mdi-arrow-down mx-2" title="Download"  style="font-size:24px;color:#4B49AC;cursor: pointer;" ></i></a>`

                                }





                            })

                        }

                        if (i != 0) {
                            add_more = ` <div class="col-md-12 remove" style="text-align: end;">
                            <a class="btn btn-danger mb-3" onclick="vendor.remove_block(this)">Remove</a>
                          </div>`

                        }
                        html += ` <div class="row get_contact_section">
                       
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label d_name_label">
                              Name</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control d_name" placeholder="Enter Name" required=""
                                data-parsley-required-message="Please Enter Name" value="${data.d_name}" disabled />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label d_designation_label">Designation</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control d_designation" placeholder="Enter Designation"
                                required="" data-parsley-required-message="Please Enter Designation" value="${data.d_designation}" disabled />
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label d_contact_label">
                              Contact</label>
                            <div class="col-sm-9">
                              <input type="number" class="form-control d_contact " id="" placeholder="Enter Contact Number"
                                required="" data-parsley-required-message="Please Enter Contact" value="${data.d_contact}" disabled />
                            </div>
                          </div>
                        </div>
  
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label d_contact_alternate_label">
                              Alternate Contact</label>
                            <div class="col-sm-9">
                              <input type="number" class="form-control d_contact_alternate" id=""
                                placeholder="Enter Contact Number" required=""
                                data-parsley-required-message="Please Enter Contact" value="${data.d_contact_alternate}" disabled />
                            </div>
                          </div>
                        </div>
  
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label d_email_label">
                              Email</label>
                            <div class="col-sm-9">
                              <input type="email" class="form-control d_email" id="" placeholder="Enter Email" required=""
                                data-parsley-required-message="Please Enter Email" value="${data.d_email}" disabled/>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label d_email_alternate_label">
                              Alternate Email</label>
                            <div class="col-sm-9">
                              <input type="email" class="form-control d_email_alternate" id="" placeholder="Enter Email"
                                required="" data-parsley-required-message="Please Enter Email" value="${data.d_email_alternate}"  disabled/>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6 pan_for_partnership" style="display: none;">

                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Pan Card Number</label>
                          <div class="col-sm-9  pan_verify_btn_section_input">
                            <input type="text" class="form-control pan_verify_input" id=""
                              placeholder="Enter Pan Card Number" required=""
                              data-parsley-required-message="Please Enter Pan Number" value="${data.pan_number}" disabled/>
                          </div>
                          
                        </div>  
  
  
                      </div>
                      <div class="col-md-6 pan_for_partnership"   style="display: none;">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">PAN Card</label>
                          <div class="col-sm-9">
                           
                            <div class="img_pre mt-2" id="pan_documents_section_1" style="display: flex;">

                            ${pan_section}
                            </div>
                          </div>
                        </div>
  
  
  
  
                      </div>
                      </div>`
                    })

                    $("#contact_section").html("")
                    $("#contact_section").append(html)

                }

                var html = ""
                var add_more = ""

                if (info.sale_data.length > 0) {

                    info.sale_data.map((data, i) => {

                        if (i != 0) {
                            add_more = ` <div class="col-md-12 remove" style="text-align: end;">
                            <a class="btn btn-danger mb-3" onclick="register.remove_block(this)">Remove</a>
                          </div>`

                        }
                        html += `  <div class="row get_sale_data">
                       
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Sales/ Mkt Name </label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control s_name" value="${data.s_name}" id="" placeholder="Enter Name" required=""
                                data-parsley-required-message="Please Enter  Name"  disabled/>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Sales/ Mkt Designation </label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control s_designation" value="${data.s_designation}" id="" placeholder="Enter Designation" required=""
                                data-parsley-required-message="Please Enter Designation"  disabled/>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Sales/ Mkt Contact </label>
                            <div class="col-sm-9">
                              <input type="number" class="form-control s_number" id="" value="${data.s_number}" placeholder="Enter Contact Number"
                                required="" data-parsley-required-message="Please Enter Contact"  disabled/>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Sales/ Mkt Alternate Contact </label>
                            <div class="col-sm-9">
                              <input type="number" class="form-control s_number_alternate" value="${data.s_number_alternate}" id=""
                                placeholder="Enter Contact Number" required=""
                                data-parsley-required-message="Please Enter Contact"  disabled/>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Sales/ Mkt Email </label>
                            <div class="col-sm-9">
                              <input type="email" class="form-control s_email" id="" value="${data.s_email}" placeholder="Enter Email" required=""
                                data-parsley-required-message="Please Enter Email"  disabled/>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Sales/ Mkt Alternate Email </label>
                            <div class="col-sm-9">
                              <input type="email" class="form-control s_email_alternate" value="${data.s_email_alternate}" id="" placeholder="Enter Email" required=""
                                data-parsley-required-message="Please Enter Email"  disabled/>
                            </div>
                          </div>
                        </div>
                      </div>`
                    })

                    $("#sales_section").html("")
                    $("#sales_section").append(html)

                }

                if (info.vendor_id.firm_type == 1) {

                    $(".add_more").css("display", "none")

                }


                var value = 0

                if (info.vendor_id != undefined) {
                    value = info.vendor_id.firm_type
                }


                if (value == 1) {
                    $(".d_name_label").text("Proprietor Name")
                    $(".d_designation_label").text("Proprietor Designation")
                    $(".d_contact_label").text("Proprietor Contact")
                    $(".d_contact_alternate_label").text("Proprietor Alternate Contact")
                    $(".d_email_label").text("Proprietor Email")
                    $(".d_email_alternate_label").text("Proprietor Alternate Email")


                } else if (value == 2) {

                    $(".d_name_label").text("Partner Name")
                    $(".d_designation_label").text("Partner Designation")
                    $(".d_contact_label").text("Partner Contact")
                    $(".d_contact_alternate_label").text("Partner Alternate Contact")
                    $(".d_email_label").text("Partner Email")
                    $(".d_email_alternate_label").text("Partner Alternate Email")
                    $(".pan_for_partnership").css("display", "block")

                } else if (value == 3 || value == 4) {

                    $(".d_name_label").text("Director Name")
                    $(".d_designation_label").text("Director Designation")
                    $(".d_contact_label").text("Director Contact")
                    $(".d_contact_alternate_label").text("Director Alternate Contact")
                    $(".d_email_label").text("Director Email")
                    $(".d_email_alternate_label").text("Director Alternate Email")
                }

                vendor.load_sign(info.vendor_id._id)
                $("#view_model_btn").click()





            }



        })



    },
    load_sign: function (id) {

        var $request = $.ajax({
            url: `${vendor.base_url}/vendor/get_sign_section/${id}`,
            type: "GET",
            dataType: "json",
            contentType: "application/json",

        });

        $request.done(function (data) {
            console.log(data)

            if (data.status) {

                var html = ""
                data.data.map(info => {

                    // Given timestamp
                    const timestamp = info.createdAt

                    // Convert timestamp to Date object
                    const date = new Date(timestamp);

                    // Extract date components
                    const day = date.getDate();
                    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
                    const year = date.getFullYear();

                    // Extract time components
                    let hours = date.getHours();
                    const minutes = date.getMinutes();
                    let amOrPm = "AM";

                    // Adjust hours to 12-hour format and determine AM/PM
                    if (hours >= 12) {
                        amOrPm = "PM";
                        hours -= 12;
                    }

                    // Format hours with leading zero if necessary
                    const formattedHours = hours.toString().padStart(2, "0");

                    // Format date and time in the desired format
                    const formattedDate = `${day}-${month}-${year}`;
                    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;

                    // Output the converted timestamp
                    const convertedTimestamp = `${formattedDate} ${formattedTime}`;
                    console.log(convertedTimestamp);


                    html += ` <div class="col-3 border mt-2">
                    <img src="${vendor.base_url}/files/${info.approved_user.sign}" width="100%" alt="">
                    <p class="text-center">${info.approved_user.name} (${info.approved_user.user_status})</p>
                    <p  class="text-center">${convertedTimestamp}</p>

                </div>`

                })


                $("#sign_section_area").html("")
                $("#sign_section_area").append(html)

            } else {

            }
        })

    },
    view_time_line: function (e) {
        let self = this;
        let row = $(e).closest('tr');
        let obj = $('#vendor_table').dataTable().fnGetData(row);
        var id = obj._id


        $("#timeline_btn").click()
        var $request = $.ajax({
            url: `${vendor.base_url}/vendor/get_timeline_data_by_vendor_id/${id}`,
            type: "GET",
            dataType: "json",
            contentType: "application/json",

        });

        $request.done(function (data) {

            if (data.status) {

                var html = ""

                $("#vendor_name_timeline").text(obj.name)
                data.data.map(info => {


                    var img = ""
                    if (info.attachment != undefined) {

                        if (info.attachment.length > 0) {
                            info.attachment.map(info1 => {
                                console.log("info1", info1)

                                var ex = info1.split('.').pop()
                                if (ex == "mp4") {
                                    img += `<div class="mx-1 remove_img_section revert_array_class"><img src="images/video.jpg" class="get_img_section" data-img='${info1}'   style="max-width:100%" alt="Img">
                                    <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info1}' onclick="vendor.remove_project_images(this)"></i></a>
                                    </div>`
                                } else if (ex == "pdf") {
                                    img += `<div class="mx-1 remove_img_section revert_array_class"><a class="a_tag" href="${vendor.base_url}/files/${info1}" target="_blank" download="new-filename"><img src="images/pdf.png" class="get_img_section" data-img='${info1}'  style="max-width:100%" alt="Img"></a>
                                    </div>`
                                } else if (ex == "mp3" || ex == "ogg") {
                                    img += `<div class="mx-1 remove_img_section revert_array_class" >
                          <audio controls class="get_img_section" data-img='${info1}'>
                          <source src="${vendor.base_url}/files/${info1}" type="audio/mpeg">
                         
                        </audio>
                                      <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info}' onclick="vendor.remove_project_images(this)"></i></a>
                                      </div>`
                                }
                                else {
                                    img += ` <img src="${vendor.base_url}/files/${info1}" onclick="vendor.show_img(this)" data-url="${vendor.base_url}/files/${info1}"    style="cursor: pointer;max-width:100%" class="my-2 mx-2"
                                    alt="">`

                                }

                            })


                        }

                    }

                    html += `    <div class="card1">
                    <div class="info">
                        <h3 class="title">${info.type ? info.type : "-"}</h3>
                        <ul>
                            <li><b>Date: </b> ${info.createdAt ? moment(info.createdAt).format('MMMM Do, YYYY') : "-"} </li>
                            <li><b>Operator: </b> ${info.operator_by ? info.operator_by.name : "-"} </li>
                            <li><b>Operator Type: </b> ${info.operator_type ? info.operator_type : "-"} </li>
                            <li><b>Forwarded: </b>${info.forwarded_to ? info.forwarded_to.name : "-"} </li>
                            <li><b>Forwarded User: </b> ${info.forwarded_to ? info.forwarded_to.user_status : "-"} </li>
                            <li><b>Comment: </b> ${info.comment ? info.comment : "-"} </li>
                            <li><b>Attachment: </b> <div> ${img}</div> </li>

                            
                        </ul>


                    </div>
                </div>`
                })


                $("#timeline_data").html("")
                $("#timeline_data").append(html)

            }
        })




    },

    forward: function (e) {
        vendor.is_final = false
        let self = this;
        let row = $(e).closest('tr');
        let obj = $('#vendor_table').dataTable().fnGetData(row);

        console.log(obj)

        $("#vendor_action_id").val(obj._id)







        $("#forword_section").css("display", "block")
        $("#revert_section").css("display", "none")

        $("#forword_btn").css("display", "block")
        $("#revert_btn").css("display", "none")


        var status = sessionStorage.getItem("user_status")
        if (status == "IT Team") {


            if (obj.is_cfo == true) {
                vendor.load_admin_role(2)

                $("#ban_number_input").attr('disabled', 'disabled')
                $("#financial_supplier").attr('disabled', 'disabled')


                vendor.is_final = true


            }
            $("#ban_section").css("display", "block")
            $("#finanical_section").css("display", "block")


            if (obj.is_ban == true) {

                $("#ban_number_input").val(obj.ban_number_input)
                $("#financial_supplier").val(obj.financial_supplier)




            }


        }

        if (status == "Finance Compliance Verification") {

            if (obj.is_ban == true) {

                vendor.load_admin_role(1)

            }


        }




        $("#action_mdole_btn").click()

    },
    revert: function (e) {
        let self = this;
        let row = $(e).closest('tr');
        let obj = $('#vendor_table').dataTable().fnGetData(row);
        $("#vendor_action_id").val(obj._id)




        vendor.is_ban = false
        $("#forword_section").css("display", "none")

        $("#revert_section").css("display", "block")

        $("#forword_btn").css("display", "none")
        $("#revert_btn").css("display", "block")

        $("#action_mdole_btn").click()

        var status = sessionStorage.getItem("user_status")

        if (status == "Finance Compliance Verification") {

            if (obj.is_ban == true) {

                vendor.is_ban = true



            }


        }


    },
    show_img: function (e) {
        var url = $(e).attr("data-url")


        Swal.fire({
            imageUrl: `${url}`,
            imageAlt: 'Image',
            showCloseButton: true,
            showConfirmButton: false,
            customClass: {
                image: 'mt-5'
            }
        });
    },
    load_admin_role: function (id) {

        $("#user_section_role").css("display", "block")

        var level_status = 0
        if (sessionStorage.getItem("user_status") == "Initiator Login") {
            level_status = "SCM Head"
        } else if (sessionStorage.getItem("user_status") == "SCM Head") {
            level_status = "Finance Compliance Verification"
        } else if (sessionStorage.getItem("user_status") == "Finance Compliance Verification") {
            level_status = "IT Team"
        } else if (sessionStorage.getItem("user_status") == "IT Team") {
            level_status = "Finance Compliance Verification"
        } else if (sessionStorage.getItem("user_status") == "CFO") {
            level_status = "IT Team"

        } else {
            level_status = 0

        }



        if (id == 1) {
            level_status = "CFO"

        } else if (id == 2) {
            level_status = "Initiator Login "
            $("#user_section_role").css("display", "none")

        }


        var $request = $.ajax({
            url: `${vendor.base_url}/admin/list_admin_by_role/${level_status}`,
            type: "GET",
            dataType: "json",
            contentType: "application/json",

        });

        $request.done(function (data) {

            if (data.status) {
                if (data.data.length > 0) {
                    var html = `<option value="0">Please Select User</option>`

                    if (id == 2) {
                        html = ""
                        $("#ban_section").css("display", "none")
                        $("#finanical_section").css("display", "none")

                        vendor.is_valid = true

                    }

                    data.data.map(info => {

                        html += `<option value="${info._id}">${info.user_status}</option>`

                    })

                    $("#select_user").html("")
                    $("#select_user").append(html)

                }
            }

        })
    },
    revert_back: function (e) {



        if ($("#comment_revert").val() == "") {
            toastr.options.positionClass = 'toast-bottom-right';
            toastr.error("Please Enter Comment...", '', { timeOut: 3000 })

        } else {
            $("#revert_btn").attr("disabled", true);
            var revert_url = []
            $(".revert_array_class").each(async function () {
                revert_url.push($(this).find(".get_img_section").attr("data-img"));

            })

            var status = sessionStorage.getItem("user_status")


            var obj = new Object()
            obj.vendor_id = $("#vendor_action_id").val()
            obj.comment_revert = $("#comment_revert").val()
            obj.attachment_revert = revert_url
            obj.operator_by = sessionStorage.getItem("user_id")
            obj.operator_type = sessionStorage.getItem("user_status")
            obj.remark = `Revert By ${status}`
            obj.is_ban = vendor.is_ban



            var $request = $.ajax({
                url: `${vendor.base_url}/vendor/revert_to_vendor`,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(obj),
            });

            $request.done(function (data) {
                if (data.status) {

                    Swal.fire(
                        'Request Send Successfully',
                        '',
                        'success'
                    ).then(() => {
                        window.location = '/existing-vendor';

                    })

                } else {
                    $("#revert_btn").attr("disabled", false);

                    toastr.options.positionClass = 'toast-bottom-right';
                    toastr.error(data.message, '', { timeOut: 3000 })

                }
            })

        }


    },
    forward_to: function (e) {



        var forward_url = []
        $(".forward_array_class").each(async function () {
            forward_url.push($(this).find(".get_img_section").attr("data-img"));

        })


        if ($("#comment_forword").val() == "") {
            toastr.options.positionClass = 'toast-bottom-right';
            toastr.error("Please Enter Comment...", '', { timeOut: 3000 })

        } else if ($("#select_user").val() == "0") {
            toastr.options.positionClass = 'toast-bottom-right';
            toastr.error("Please Select User...", '', { timeOut: 3000 })
        }

        else {



            if (vendor.is_valid == true && forward_url.length == 0) {
                toastr.options.positionClass = 'toast-bottom-right';
                toastr.error("Please Upload Document...", '', { timeOut: 3000 })

            } else {

                $("#forword_btn").attr("disabled", true);



                var status = sessionStorage.getItem("user_status")

                var obj = new Object()

                obj.vendor_id = $("#vendor_action_id").val()
                obj.comment_forword = $("#comment_forword").val()
                obj.attachment_forword = forward_url
                obj.forwarded_to = $("#select_user").val()
                obj.remark = `Approved By ${status}`
                obj.ban_number_input = $("#ban_number_input").val()
                obj.financial_supplier = $("#financial_supplier").val()


                obj.operator_by = sessionStorage.getItem("user_id")
                obj.operator_type = sessionStorage.getItem("user_status")
                obj.is_final = vendor.is_final



                console.log(obj)
                // return

                var $request = $.ajax({
                    url: `${vendor.base_url}/vendor/forward_to_admin`,
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(obj),
                });

                $request.done(function (data) {
                    if (data.status) {

                        Swal.fire(
                            'Request Send Successfully',
                            '',
                            'success'
                        ).then(() => {
                            window.location = '/existing-vendor';

                        })

                    } else {
                        $("#forword_btn").attr("disabled", false);

                        toastr.options.positionClass = 'toast-bottom-right';
                        toastr.error(data.message, '', { timeOut: 3000 })

                    }
                })


            }

        }


    },
    upload_revert_attachment_files: function (e) {
        // --------project banner img-----------------//
        var formData = new FormData();
        let media_length = $(e)[0].files.length

        for (let i = 0; i <= media_length; i++)
            formData.append('files', $(e)[0].files[i]);


        var $request = $.ajax({
            url: `${vendor.base_url}/admin/upload-files`,
            data: formData,
            type: 'POST',
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
        });

        $request.done(async function (response) {
            if (response.status == true) {


                var project_img_array = []

                await response.url.map(info => {
                    project_img_array.push(info.filename)
                })


                var img = ""
                project_img_array.map(info => {
                    var ex = info.split('.').pop()
                    if (ex == "mp4") {
                        img += `<div class="mx-1 remove_img_section revert_array_class"><img src="images/video.jpg" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                                    <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info}' onclick="vendor.remove_project_images(this)">X</i></a>
                                    </div>`
                    } else if (ex == "pdf") {
                        img += `<div class="mx-1 remove_img_section revert_array_class"><img src="images/pdf.png" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                                    <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info}' onclick="vendor.remove_project_images(this)">X</i></a>
                                    </div>`
                    } else if (ex == "mp3" || ex == "ogg") {
                        img += `<div class="mx-1 remove_img_section revert_array_class" >
                          <audio controls class="get_img_section" data-img='${info}'>
                          <source src="${vendor.base_url}/files/${info}" type="audio/mpeg">
                         
                        </audio>
                                      <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info}' onclick="vendor.remove_project_images(this)">X</i></a>
                                      </div>`
                    }
                    else {
                        img += `<div class="mx-1 remove_img_section revert_array_class"><img src="${vendor.base_url}/files/${info}" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                                <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info}' onclick="vendor.remove_project_images(this)">X</i></a>
                                </div>`

                    }


                })

                $(e).siblings(".img_pre").append(img)
            }
        })

    },
    upload_forward_attachment_files: function (e) {
        // --------project banner img-----------------//
        var formData = new FormData();
        let media_length = $(e)[0].files.length

        for (let i = 0; i <= media_length; i++)
            formData.append('files', $(e)[0].files[i]);


        var $request = $.ajax({
            url: `${vendor.base_url}/admin/upload-files`,
            data: formData,
            type: 'POST',
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
        });

        $request.done(async function (response) {
            if (response.status == true) {


                var project_img_array = []

                await response.url.map(info => {
                    project_img_array.push(info.filename)
                })


                var img = ""
                project_img_array.map(info => {

                    var ex = info.split('.').pop()

                    if (ex == "mp4") {
                        img += `<div class="mx-1 remove_img_section forward_array_class"><img src="images/video.jpg" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                                  <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info}' onclick="vendor.remove_project_images(this)">X</i></a>
                                  </div>`
                    } else if (ex == "pdf") {
                        img += `<div class="mx-1 remove_img_section forward_array_class"><img src="images/pdf.png" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                                  <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info}' onclick="vendor.remove_project_images(this)">X</i></a>
                                  </div>`
                    } else if (ex == "mp3" || ex == "ogg") {
                        img += `<div class="mx-1 remove_img_section forward_array_class" >
                        <audio controls class="get_img_section" data-img='${info}'>
                        <source src="${vendor.base_url}/files/${info}" type="audio/mpeg">
                       
                      </audio>
                                    <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info}' onclick="vendor.remove_project_images(this)">X</i></a>
                                    </div>`
                    }
                    else {
                        img += `<div class="mx-1 remove_img_section forward_array_class"><img src="${vendor.base_url}/files/${info}" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                              <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info}' onclick="vendor.remove_project_images(this)">X</i></a>
                              </div>`

                    }
                    // img += `<div class="mx-1 remove_img_section forward_array_class"><img src="${vendor.base_url}/images/pdf.png" class="get_img_section" data-img='${info}'   width=100px alt="Img">
                    // <a class="a_tag" download="new-filename"><i class="fa-check" style="cursor: pointer;" data-img-name='${info}' onclick="vendor.remove_project_images(this)">X</i></a>
                    // </div>`

                })

                $(e).siblings(".img_pre").html("")
                $(e).siblings(".img_pre").append(img)

            }
        })

    },
    remove_project_images: async function (e) {

        Swal.fire({
            title: 'Are you sure to remove image?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $(e).parent(".a_tag").parent(".remove_img_section").remove()
                toastr.options.positionClass = 'toast-bottom-right';
                toastr.success("Images remove successfully...!", '', { timeOut: 3000 },)
            }
        })
    },
    downloaded_pdf: async function (e) {
        let self = this;
        let row = $(e).closest('tr');
        let obj = $('#vendor_table').dataTable().fnGetData(row);
        console.log(obj)


        var $request = $.ajax({
            url: `${vendor.base_url}/vendor/downloaded_pdf`,
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(obj),

        });

        $request.done(function (data) {

            console.log(data)

        })





    }














};





