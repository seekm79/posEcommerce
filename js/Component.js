window.Index = () => {
    //Initialize Select2 Elements
    $('.select2').select2();

    //Initialize Select2 Elements
    $('.select2bs4').select2({
        theme: 'bootstrap4'
    });

    //Datemask dd/mm/yyyy
    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
    //Datemask2 mm/dd/yyyy
    $('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' });
    //Money Euro
    $('[data-mask]').inputmask();

    //Date range picker
    $('#reservationdate').datetimepicker({
        format: 'L'
    });
    //Date range picker
    $('#reservation').daterangepicker()
    //Date range picker with time picker
    $('#reservationtime').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        locale: {
            format: 'MM/DD/YYYY hh:mm A'
        }
    });
    //Date range as a button
    $('#daterange-btn').daterangepicker(
        {
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            startDate: moment().subtract(29, 'days'),
            endDate: moment()
        },
        function (start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
        }
    );

    //Timepicker
    $('#timepicker').datetimepicker({
        format: 'LT'
    });

    //Bootstrap Duallistbox
    $('.duallistbox').bootstrapDualListbox();

    //Colorpicker
    $('.my-colorpicker1').colorpicker();
    //color picker with addon
    $('.my-colorpicker2').colorpicker();

    $('.my-colorpicker2').on('colorpickerChange', function (event) {
        $('.my-colorpicker2 .fa-square').css('color', event.color.toString());
    });

    $("input[data-bootstrap-switch]").each(function () {
        $(this).bootstrapSwitch('state', $(this).prop('checked'));
    });

};

//window.DropdownList = () => {
//    $('.select2').select2();
//    //Initialize Select2 Elements
//    $('.select2bs4').select2({
//        theme: 'bootstrap4'
//    });
//};

//window.select2Component = {
//    init: function (Id) {
//        //Initialize Select2 Elements
//        $('#' + Id).select2();
//    },
//    onChange: function (id, dotnetHelper, nameFunc) {
//        $('#' + id).on('select2:select', function (e) {
//            dotnetHelper.invokeMethodAsync(nameFunc, $('#' + id).val());
//        });
//    },
//};

window.select2Component = {
    init: function (Id, AllowClear, Placeholder) {
        //Initialize Select2 Elements
        $('#' + Id).select2({
            minimumResultsForSearch: -1,
            placeholder: Placeholder,
            allowClear: AllowClear
        });

    },
    initSearchable: function (Id, AllowClear, Placeholder) {
        //Initialize Select2 Elements
        $('#' + Id).select2();
        //$('#' + Id).select2({
        //    minimumResultsForSearch: 10,          
        //    placeholder: Placeholder,
        //    allowClear: AllowClear
        //});
    },
    initMultiSelect: function (Id, AllowClear, Placeholder, Values) {
        //Initialize Select2 Elements
        $('#' + Id).select2({
            minimumResultsForSearch: -1,
            placeholder: Placeholder,
            allowClear: AllowClear
        });
        if (Values !== null)
        {
            $('#' + Id).val(Values).change();
        }
    },
    updateMultiSelectValues: function (Id, Values) {
        $('#' + Id).val(Values).change();
    },
    onChange: function (id, dotnetHelper, nameFunc) {
        $('#' + id).on('select2:select', function (e) {
            dotnetHelper.invokeMethodAsync(nameFunc, $('#' + id).val());
        });
    },
    onSelect: function (id, dotnetHelper, nameFunc) {
        $('#' + id).on('select2:select', function (e) {
            dotnetHelper.invokeMethodAsync(nameFunc, $('#' + id).val());
        });
    },
    onUnselect: function (id, dotnetHelper, nameFunc) {
        $('#' + id).on('select2:unselect', function (e) {
            dotnetHelper.invokeMethodAsync(nameFunc, $('#' + id).val());
        });
    },
    onClear: function (id, dotnetHelper, nameFunc) {
        $('#' + id).on('select2:clear', function (e) {
            dotnetHelper.invokeMethodAsync(nameFunc, $('#' + id).val());
        });
    }
};
window.dateComponent = {
    init: function (Id, dotnetHelper, nameFunc) {
        $('#' + Id).daterangepicker({
            singleDatePicker: true,
            autoUpdateInput: false,
            locale: {
                format: 'DD/MM/YYYY'
            }
        }, function (chosen_date) {
                $('#' + Id).val(chosen_date.format('DD/MM/YYYY'));
                dotnetHelper.invokeMethodAsync(nameFunc, chosen_date.format('DD/MM/YYYY') );
        });
        $('#' + Id).blur(function () {
            //if ($('#' + Id).val().trim() === "") {
            //    var nowDate = new Date();
            //    var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
            //    $('#' + Id).val(today.format('DD/MM/YYYY'));
            //}
                dotnetHelper.invokeMethodAsync(nameFunc, $('#' + Id).val());
        });
        $('#' + Id).click(function () {
            if ($('#' + Id).val().trim() === "") {
                var nowDate = new Date();
                var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
                $('#' + Id).val(dateToDMY(today));
            }
        });
        function dateToDMY(date) {
            var d = date.getDate();
            var m = date.getMonth()+ 1;
            var y = date.getFullYear();
            return pad(d, 2) + '/' + pad(m, 2) + '/' + pad(y, 2);
        }
        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
    },
    SetDate: function (Id, dateValue) {
        $('#' + Id).val(dateValue);
    }
};

window.dateRangeComponent = {
    init: function (Id, dotnetHelper, nameFunc) {
        $('#' + Id).daterangepicker({
            opens: 'right', autoUpdateInput: false, locale: {
                format: 'DD/MM/YYYY'
            }
        }, function (start, end, label) {
                $('#' + Id).val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
                dotnetHelper.invokeMethodAsync(nameFunc, start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
        });
        $('#' + Id).blur(function () {
                dotnetHelper.invokeMethodAsync(nameFunc, $('#' + Id).val());
        });
    },
    SetDate: function (Id, dateValue) {
        $('#' + Id).val(dateValue);
    },
    ClearDate: function (Id, dotnetHelper, nameFunc) {
        $('#' + Id).val('');
        $('#' + Id).daterangepicker({
            opens: 'right', autoUpdateInput: false, locale: {
                format: 'DD/MM/YYYY'
            }
        }, function (start, end, label) {
            $('#' + Id).val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
            dotnetHelper.invokeMethodAsync(nameFunc, start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
        });
        $('#' + Id).blur(function () {
            dotnetHelper.invokeMethodAsync(nameFunc, $('#' + Id).val());
        });
    }
};
window.timeComponent = {
    init: function (Id, dotnetHelper, nameFunc) {
        $('#' + Id).datetimepicker({
            format: 'LT',
            autoUpdateInput: false
        });
        $('#' + Id).blur(function () {
            dotnetHelper.invokeMethodAsync(nameFunc, $('#' + Id).val());
        });
    },
    SetTime: function (Id, timeValue) {
        
        if (Id === '') {
            return;
        }
        $('#' + Id).datetimepicker({
            format: 'LT',
            autoUpdateInput: false
        });
        var date = new Date(timeValue);
        var minDate = new Date(1901, 1, 1, 1, 1, 1, 1);
        if (date === undefined || date < minDate || timeValue === '0001-01-01 12:00 AM') {
                $('#' + Id).val('');
            }
            else {
                var res = timeValue.substring(11, 19);
                if (res === undefined) {
                    $('#' + Id).val('');
                }
                else {
                    $('#' + Id).val(res);
                }

            }
    }
};
window.textBoxComponent = {
    init: function (Id,MaxLength) {
        $('#' + Id)[0].maxLength = MaxLength;
        // OR:
        $('#' + Id).attr('maxlength', MaxLength);
        // OR you can use prop if you are using jQuery 1.6+:
        $('#' + Id).prop('maxLength', MaxLength);

    }
};
window.textBoxSearchComponent = {
    init: function (Id, MaxLength, dotnetHelper, nameFunc) {
        $('#' + Id)[0].maxLength = MaxLength;
        // OR:
        $('#' + Id).attr('maxlength', MaxLength);
        // OR you can use prop if you are using jQuery 1.6+:
        $('#' + Id).prop('maxLength', MaxLength);
        $('#' + Id).focusout(function () {
            dotnetHelper.invokeMethodAsync(nameFunc);
        });
        $('#' + Id).keyup(function (e) {
            if (e.keyCode === 13) {
                dotnetHelper.invokeMethodAsync(nameFunc);
            }
        });
    }

};
window.textBoxNumberComponent = {
    init: function (Id) {
        $('#' + Id).keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key === 8 ||
                key === 9 ||
                key === 13 ||
                key === 46 ||
                key === 110 ||
                key === 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    },

};
window.textBoxIntComponent = {
    init: function (Id) {
        $('#' + Id).keyup(function (e) {
            if (/\D/g.test(this.value)) {
                // Filter non-digits from input value.
                this.value = this.value.replace(/\D/g, '');
            }
        });
    }
};
window.textAreaComponent = {
    init: function (Id, MaxLength,Rows) {
        $('#' + Id).on("propertychange input", function () {
            if (this.value.length > MaxLength) {
                this.value = this.value.substring(0, MaxLength);
            }
        });
        $('#' + Id).attr('rows', Rows);
    }
};

window.htmlEditorComponent = {
    init: function (Id, Placeholder, Value, dotnetHelper, nameFunc) {
        $('#' + Id).summernote({
            placeholder: Placeholder,
            height: 250
        });
        $('#' + Id).summernote();
        $('#' + Id).summernote('code', Value);
        $('#' + Id).on('summernote.change', function (we, contents, $editable) {
            dotnetHelper.invokeMethodAsync(nameFunc, contents);
        });
    }
};

window.PopModal = {
    pop: function (modalName) {
       
        $.fn.modal.Constructor.prototype._enforceFocus = function () { };
 
        var searchEles = document.getElementById(modalName).querySelectorAll('[id^="singleDropdownN"]');
        for (var i = 0; i < searchEles.length; i++) {
            if (searchEles[i].tagName.toUpperCase() === 'SELECT') {
                var dropdownParent = $(document.body);
                if ($(this).parents('.modal.in:first').length !== 0)
                    dropdownParent = $(this).parents('.modal.in:first');
                $('#' +searchEles[i].id).select2({
                    dropdownParent: dropdownParent,
                    placeholder: 'Please select...',
                    minimumResultsForSearch: -1,
                    allowClear: true
                });
            }
        }

        searchEles = document.getElementById(modalName).querySelectorAll('[id^="singleDropdownY"]');
        for (i = 0; i < searchEles.length; i++) {
            if (searchEles[i].tagName.toUpperCase() === 'SELECT') {
                dropdownParent = $(document.body);
                if ($(this).parents('.modal.in:first').length !== 0)
                    dropdownParent = $(this).parents('.modal.in:first');
                $('#' + searchEles[i].id).select2({
                    dropdownParent: dropdownParent,
                    placeholder: 'Please select...',
                    allowClear: true
                });
            }
        }
        $("#" + modalName).modal('show');
    },
    hide: function(modalName) {
        $("#" + modalName).modal('hide');
    }
};

window.ButtonClick = (c) => {
    document.getElementById(c).click();
};
window.Page = {
    ReloadPage: function () {
        document.getElementById('reportFrame').src = document.getElementById('reportFrame').src;
    }
};

window.ToastrSuccess = (message) => {
    toastr.success(message);
};

window.ToastrWarning = (message) => {
    $(document).Toasts('create', {
        class: 'bg-warning',
        title: 'Toast Title',
        subtitle: 'Subtitle',
        body: message
    })
};

window.DivDragEvent = {

    onDragEnd: function (id, dotnetHelper, nameFunc) {
        $('#' + id).on('dragend', function (evt, ui) {
            var el = $('#' + id);
            var position = evt.position();
            console.log("left: " + position.left + ", top: " + position.top);

            //console.log(evt);

            $('#' + id).text("STOP: \nLeft: " + position.left+ "\nTop: " + position.top);
            dotnetHelper.invokeMethodAsync(nameFunc, "" + position.left + "|" + position.top);
        });
    },

    onMouseEvent: function (id, dotnetHelper, nameFunc) {
        var DivMouseisDown = false;
        var div = document.getElementById(id);
        var mousePosition;
        var offset = [0, 0];


        div.addEventListener('mousedown', function (e) {
            DivMouseisDown = true;
            offset = [
                div.offsetLeft - e.clientX,
                div.offsetTop - e.clientY
            ];
/*            div.style.border = "3px solid brown";*/
        }, true);

        document.addEventListener('mouseup', function () {
            DivMouseisDown = false;
            div.style.border = "2px solid grey";
        }, true);

        document.addEventListener('mousemove', function (event) {
            event.preventDefault();
            if (DivMouseisDown) {
                mousePosition = {

                    x: event.clientX,
                    y: event.clientY

                };
                div.style.left = (mousePosition.x + offset[0]) + 'px';
                div.style.top = (mousePosition.y + offset[1]) + 'px';
                div.style.border = "3px solid brown";
                dotnetHelper.invokeMethodAsync(nameFunc, "" + div.style.left + "|" + div.style.top + "|" + id);
            }
        }, true);
    },
};

window.ReceiptPage =
{
    OnLoadPage: function (url) {
        $("<iframe>")                             // create a new iframe element
            .hide()                               // make it invisible
            .attr("src", url) // point the iframe to the page you want to print
            .appendTo("body");                    // add iframe to the DOM to cause it to load the page
    },
    OnPrintPage: function () {
        window.print();
    },
};
window.CustomModal = {
    OnPop: function (modalName) { 
        var modal = document.getElementById(modalName);
        modal.style.display = "block";

    },
    OnHide: function (Id) {
        var modal = document.getElementById(Id);
        modal.style.display = "none";
    },
    FixDropDown: function (modalName) {
        $.fn.modal.Constructor.prototype.enforceFocus = function () { };

        var x = document.getElementsByClassName("dropdownlist-nosearchable");
        var i;
        for (i = 0; i < x.length; i++) {
            $("#" + x[i].id).select2({
                dropdownParent: $('#' + modalName),
                minimumResultsForSearch: -1,
                dropdownCssClass: "dropdownlistfont",
                placeholder: 'Please select...',
                allowClear: true
            });
        }
        x = document.getElementsByClassName("dropdownlist-searchable");
        i = 0;
        for (i = 0; i < x.length; i++) {
            $("#" + x[i].id).select2({
                dropdownParent: $('#' + modalName),
                dropdownCssClass: "dropdownlistfont",
                placeholder: 'Please select...',
                allowClear: true
            });
        }
        x = document.getElementsByClassName("multiselector");
        i = 0;
        for (i = 0; i < x.length; i++) {
            $("#" + x[i].id).select2({
                dropdownParent: $('#' + modalName),
                dropdownCssClass: "dropdownlistfont",
                minimumResultsForSearch: -1
            });
            $("#" + x[i].id).find('ul.select2-results__options').addClass('dropdownlistfont');
            $("#" + x[i].id).find('li.select2-results__option').addClass('dropdownlistfont');
        }
        $("body").find('ul.select2-results__options').addClass('dropdownlistfont');
        $("body").find('li.select2-results__option').addClass('dropdownlistfont');
    },
};
