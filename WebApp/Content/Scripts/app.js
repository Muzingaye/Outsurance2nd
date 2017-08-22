
var app = {
    LoadAction: "",
    SilksAction: "",
    CardPreviewAction: "",
    CheckAction: "",
    ReLoadAction: "",
    RacingCalenderAction: "",
    ITWProgramAction: "",
    CheckProgramsAction: "",
    FetchAction: "",
    ViewLogAction: "",
    ErrorLogAction: "",
    FilesAction: "",
    ProgramsAction: "",
    LoadCount: 0,
    LoadUrls: new Array(),

    Refresh: function() {
        location.reload();
    },

    ListFiles: function () {
        $.ajax({
            url: this.FilesAction,
            type: 'GET',
            success: function (data) {
                var fileCount = data.HorseFileList.length + data.SportFileList.length;
                $("#fileCount").html(fileCount);
                if (fileCount > 0)
                    $("#xmlFiles").html("");
                $(data.HorseFileList).each(function (index) {
                    $("#xmlFiles").append('<li class="list-group-item"><span class="file" data-type="horse">' + data.HorseFileList[index] + '</span> <span class="badge">Racing</span></li>');
                });
                $(data.SportFileList).each(function (index) {
                    $("#xmlFiles").append('<li class="list-group-item"><span class="file" data-type="sport">' + data.SportFileList[index] + '</span> <span class="badge">Sport</span></li>');
                });
            }, complete: function () {
                app.ProgressBar(0);
                var wtf = $('#panelXmlFiles');
                var height = wtf[0].scrollHeight;
                wtf.scrollTop(height);
            }
        });
    },
    ShowModal: function (modalId, message, title) {
        if (title !== "")
            $("#modal-" + modalId).find(".modal-title").html(title);
        if (message !== "")
            $("#modal-" + modalId).find(".modal-data").html(message);

        $("#modal-" + modalId).modal();
    },
    HideModal: function (modalId) {
        $("#modal-" + modalId).modal('hide');
    },
    LoadCards: function () {
        app.ClearContent("#messageLogs");
        $("#loadRaceCard", "#checkStatus", "#fetchRaceCard").attr("disabled", "disabled");
        $("ul#xmlFiles .file").each(function (index, el) {
            var file = $(el).html();
            var type = $(el).attr("data-type");
            if (File !== "" && type !== "") {
                app.LoadUrls.push(app.LoadAction + "?filename=" + file + "&type=" + type);
            }

        });

        app.LoadCount = app.LoadUrls.length - 1;
        if (app.LoadCount >= 0) {
            var dt = new Date();
            var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            $("#messageLogs").append("<div>" + time + " .." + "Start Loading ..." + "</div>");
            app.LoadCard();
            app.ProgramList();
        } else {
            $("#messageLogs").append("<div>" + "No Race Cards" + "</div>");
            $("#loadRaceCard", "#checkStatus", "#fetchRaceCard").removeAttr("disabled");
            var wtdf = $('#panelMessage');
            var height = wtdf[0].scrollHeight;
            wtdf.scrollTop(height);
        }


    },
    LoadMessage: function () {
        $.ajax({
            url: app.LoadUrls[app.LoadCount],
            success: function (data) {
                $(data.loadResult).each(function (index) {
                    var dt = new Date();
                    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                    $("#programs").append('<li class="list-group-item"><span class="file">' + data.loadResult[index] + '</span> <span class="badge badge-danger"><i class="fa fa-times"></i></span></li>');
                    $("#messageLogs").append("<div>" + time + " .." + data.loadResult[index] + "</div>");
                });
            }
        });
    },
    ProgramList: function () {
        app.ClearContent("#programs");
        $.ajax({
            url: this.ProgramsAction,
            type: 'GET',
            success: function (data) {
                $(data).each(function (index, program) {
                    if (program.IsLoaded) {
                        $("#programs").append('<li class="list-group-item " ><span><a href="#" onclick="app.CardPreview(\'' + program.ProgramDateFormated + "', '" + program.ProgramCode + '\')">' + program.ProgramDateFormated + '  ' + program.ProgramCode + ' ' + program.ProgramName + '</a></span> <span class="label label-success pull-right"><i class="fa fa-check"></i></span></li>');
                       
                    } else {
                        $("#programs").append('<li class="list-group-item"><span>' + program.ProgramDateFormated + ' ' + program.ProgramCode + ' ' + program.ProgramName + '</span> <span class="label label-danger pull-right"><i class="fa fa-times"></i></span></li>');
                    }
                });
            },
            complete: function () {
                $("ul#xmlFiles li").eq(app.LoadCount).remove();
                app.LoadCount--;
                if (app.LoadCount > 0)
                    app.ProgressBar((100 / app.LoadCount));
                app.LoadCard();

                var wtf = $('#panelPrograms');
                var height = wtf[0].scrollHeight;
                wtf.scrollTop(height);
            }
        });
    },
    CardPreview: (function (ProgramDateFormated, programCode) {
        var HorseTable = '<table id="cardRace" class="table table-striped  table-grid-display" width="100%"><thead><tr><th>Program Code</th><th>Saddle</th><th>Runners</th></tr></thead><tbody>';

        $.ajax({
            url: this.CardPreviewAction + '?ProgramDate=' + ProgramDateFormated + '&ProgramCode=' + programCode,
            type: 'GET',
            success: function (data) {
                var race = 0;
                var match = 1;
                $(data).each(function (index, obj) {
                    if (obj.SportType === 'S') {
                        if (index === 0) {
                            HorseTable = '<table id="" class="table table-striped  table-grid-display"><thead><tr><th><th>TEAM A</th><th> </th><th>TEAM B</th> <th>ITWCode</th></tr></thead><tbody>';

                        }
                        if (obj.Race !== race) {
                            HorseTable += '<tr><th bgcolor="#ccccff"> Race ' + obj.Race + '</th><th bgcolor="#ccccff"></th><th bgcolor="#ccccff"></th><th bgcolor="#ccccff"></th><th bgcolor="#ccccff">Date: ' + obj.ProgramDateFormated + '</th></tr>';
                            race = obj.Race;
                        }

                        HorseTable += '<tr><td><strong> M' + match + '</strong></td><td><strong>' + obj.TeamA + '</strong></td><td>' + ' vs ' + '</td><td><strong>' + obj.TeamB + '</strong></td><td>' + obj.ProgramCode + '</td></tr>';
                     } else {
                        if (obj.Race !== race) {
                            
							HorseTable += '<tr><th bgcolor="#ccccff"> Race ' + obj.Race + '</th><th bgcolor="#ccccff"></th><th bgcolor="#ccccff">Date: ' + obj.ProgramDateFormated + '</th></tr>';
                            race = obj.Race;
                            match = 1;
                        }

                        if (obj.ProgramCode === "GGG" && obj.Runner !== null) {
                            HorseTable += '<tr><td><strong>' + obj.Saddle + '</strong></td><td></td><td><strong>' + obj.Runner + '</strong></td><td></td><td></td></tr>';
                       
                        } else if (obj.ProgramCode === "GHH" && obj.Runner !== null) {
                            HorseTable += '<tr><td><strong>' + obj.Saddle + '</strong></td><td></td><td><strong>' + obj.Runner + '</strong></td><td></td><td></td></tr>';
                        } else {
                            HorseTable += '<tr><td>' + obj.ProgramCode + '</td><td><strong>' + obj.Saddle + '</strong></td><td><strong>' + obj.Runner + '</strong></td></tr>';
                        }

                    }
                    match++;
                });
                HorseTable += "</tbody></table>";
                app.ShowModal("alert-sm", HorseTable, "Race Cards");
                $('.table-grid-display').dataTable({
                    "paging": true
                });
            }

        });
    }),
    LoadCard: function () {
        if (app.LoadCount < 0) {

            var dt = new Date();
            var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            $("#loadRaceCard", "#checkStatus", "#fetchRaceCard,").removeAttr("disabled");
            app.ListFiles();
            app.LoadCount = 0;
            app.LoadUrls = new Array();

            return;
        }
        $.ajax({
            url: app.LoadUrls[app.LoadCount],
            type: 'GET',
            success: function (data) {
                $(data.ResultList).each(function (index) {
                    var dt2 = new Date();
                    var time2 = dt2.getHours() + ":" + dt2.getMinutes() + ":" + dt2.getSeconds();
                    $("#messageLogs").append("<div>" + time2 + " .." + data.ResultList[index] + "</div>");
                    var wtf = $('#panelMessage');
                    var height = wtf[0].scrollHeight;
                    wtf.scrollTop(height);
                });
            },
            complete: function () {
                $("ul#xmlFiles li").eq(app.LoadCount).remove();
                app.LoadCount--;
                if (app.LoadCount > 0)
                    app.ProgressBar((100 / app.LoadCount));
                app.LoadCard();
                app.ListFiles();
            }
        });
        app.Refresh();
    },
    LoadSilks: function () {
        $("#fileCount").html(0);
        $("#xmlFiles").html("").append('<li class="list-group-item"> Silks Loading please wait... </li>');
        $("#messageLogs").append("Start Downloading Silks ..." + "<br />");
        $("#loadRaceCard, #checkStatus, #fetchRaceCard").attr("disabled", "disabled");
        app.ProgressBar(82);
        $.ajax({
            url: this.SilksAction,
            type: 'GET',
            success: function (data) {
                app.ClearContent("#messageLogs");
                $(data.ResultList).each(function (index) {
                    $("#messageLogs").append("<div>" + " .." + data.ResultList[index] + "</div>");
                });
            }, complete: function () {
                app.ProgressBar(100);
                $("#loadRaceCard, #checkStatus, #fetchRaceCard").removeAttr("disabled");
                app.ListFiles();
            }
        });

    },

    CheckPrograms: function () {
        app.ClearContent("#messageLogs");
        app.ProgressBar(0);
        var ProgramTable = '<table id="ITWPrograms" class="table table-striped  table-grid-display" width="100%"><thead><tr><th>Program Code</th><th>Program Name</th><th>Edit Code</th></tr></thead><tbody>';
        $.ajax({
            url: this.ITWProgramAction,
            type: 'GET',
            success: function (data) {
                $(data).each(function (index, obj) {
                    ProgramTable += '<tr><td><strong>' + obj.ProgramCode + '</strong></td><td>' + obj.CourseName + '</td><td><a href="#" id=UpdateProgram"" onclick="app.UpdateProgram(\'' + obj.ProgramCode + '\')">' + obj.ProgramCode + '</a></td></tr>';
                });
                ProgramTable += "</tbody></table>";

                app.ShowModal("alert-sm", ProgramTable, "Program ITW Code");
                $('.table-grid-display').dataTable({
                    "scrollY": "400px",
                    "scrollCollapse": true,
                    "paging": true
                });

            }
        });
    },
    UpdateProgram: function (programCode) {
        
        $.ajax({
            type: "GET",
            url: this.UpdateProgramCodeAction + '?ProgramCode=' + programCode,
            success: function (data) {
                $(data).each(function (index, obj) {

                    app.ShowModal("alert-sm", $("#UpdateProgramCode").html(), "Edit New Program Code");
                    $("#PROGRAMCODE").val(obj.PROGRAMCODE);
                    $("#DISPLAYCODE").val(obj.DISPLAYCODE);
                    $("#COURSENAME").val(obj.COURSENAME);
                    $("#COUNTRY").val(obj.COUNTRY);
                    $("#COUNTRYABBREVIATION").val(obj.COUNTRYABBREVIATION);
                    $("#CURRENCY").val(obj.CURRENCY);
                    $("#CATEGORY").val(obj.CATEGORY);
                    $("#SUBCATEGORY").val(obj.SUBCATEGORY);
                    $("#ORDERNUMBER").val(obj.ORDERNUMBER);

                    if (obj.PROGRAMCODE == null) {
                        app.ShowModal("alert-sm", $("#accessDinied").html(), "You do have permision to Edit the Program Code");
                    }
                });
            }
        });
    },
    CheckStaus: function () {
        app.ClearContent("#messageLogs");
        app.ProgressBar(0);
        $("#loadRaceCard, #checkStatus, #fetchRaceCard").attr("disabled", "disabled");
        var Status = "";
        $.ajax({
            url: this.CheckAction,
            type: 'GET',
            success: function (data) {
                $(data).each(function (index) {
                    $("#messageLogs").append("<div>" + data[index] + "</div>");
                    Status += "<div>" + data[index] + "</div>";
                });
                app.ShowModal("alert-sm", Status, "Race Card Status");
            },
            complete: function () {
                $("#loadRaceCard, #checkStatus, #fetchRaceCard").removeAttr("disabled");
            }
        });
    },
    ShowReloadForm: function () {
        $('#reLoadForm').show();

        $('#reloadProgramDate').datepicker({
            beforeShow: function (input) {
                $(input).css({
                    "postion": "relative",
                    "z-index": "9999"
                });
            }
        });
        app.ShowModal("alert-sm", $("#reLoadForm"), "Reload Race Card");
    },
    ReloadRaceCard: function () {
        
        var progr = $('#ReloadProgramCode').val();
        var programCode = $('#ReloadProgramCode').val();
        var programDate = $('#reloadProgramDate').val();
        var category = $('#ReloadCategory').val();
        app.ShowModal("alert-sm", "     Please wait Program Code: " + progr + " is Re-Loading: ", " Program ITW Code");

        $.ajax({
            url: this.ReLoadAction + '?ProgramCode=' + programCode + '&ProgramDate=' + programDate + '&Category=' + category,
            type: 'GET',
            success: function (data) {

                app.ClearContent("#messageLogs");
                $(data.ResultList).each(function (index) {
                    console.log(index);
                    $("#messageLogs").append("<div>" + data.ResultList[index] + "</div>");
                });


            }, complete: function () {
                $("#loadRaceCard, #checkStatus, #fetchRaceCard").removeAttr("disabled");
                app.HideModal("alert-sm");
                app.ListFiles();
            }
        });
        app.Refresh();
    },
    LoadSelectedDate: function () {
        var programDate = $('#seletedDate').val();
        $.ajax({
            url: this.RacingCalenderAction + '?selectedDate=' + programDate,
            type: 'GET',
            success: function (data) {
                app.ClearContent("#racingCalendaCards");
                $(data).each(function (index, obj) {
                    if (obj.IsLoaded) {
                        $("#racingCalendaCards").append('<li class="list-group-item " ><span><a href="#" onclick="app.CardPreview(\'' + obj.ProgramDateFormated + "', '" + obj.ProgramCode + '\')">' + obj.ProgramDateFormated + '  ' + obj.ProgramCode + ' ' + obj.ProgramName + '</a></span> <span class="label label-success pull-right"><i class="fa fa-check"></i></span></li>');
                      //  $("#racingCalendaCards").append('<li class="list-group-item " ><span><a href="#" onclick="app.CardPreview(\'' + obj.ProgramCode + '\')" class="cardPreview" > ' + obj.ProgramDateFormated + ' ' + obj.ProgramCode + ' ' + obj.ProgramName + '</a></span> <span class="label label-success pull-right"><i class="fa fa-check"></i></span></li>');
                    } else {
                        $("#racingCalendaCards").append('<li class="list-group-item"><span>' + obj.ProgramDateFormated + ' ' + obj.ProgramCode + ' ' + obj.ProgramName + '</span> <span class="label label-danger pull-right"><i class="fa fa-times"></i></span></li>');
                    }
                });
            },
            error: function (xhr) {
                $("#racingCalenderCards").html(xhr.responseText);
            }
        });
    },
    ContactUs: function () {
        $('#contactus-form').show();
        app.ShowModal("alert-sm", $("#contactus-form"), "Contact Us");
    },
    AddNewProgramCode: function () {
        app.ShowModal("alert-sm", $("#NewProgramCode").html(), "Add New Program Code");
    },
    FetcheCards: function () {
        $("#fileCount").html(0);
        $("#xmlFiles").html("").append('<li class="list-group-item"> Loading please wait... </li>');
        $("#messageLogs").append("Start Downloading Process ..." + "<br />");
        $("#loadRaceCard, #checkStatus, #fetchRaceCard").attr("disabled", "disabled");
        app.ProgressBar(75);
        $.ajax({
            url: this.FetchAction,
            type: 'GET',
            success: function (data) {
                app.ClearContent("#messageLogs");
                $(data.ResultList).each(function (index) {
                    $("#messageLogs").append("<div>" + " .." + data.ResultList[index] + "</div>");
                });
            }, complete: function () {
                app.ProgressBar(100);
                $("#loadRaceCard, #checkStatus, #fetchRaceCard").removeAttr("disabled");
                app.ListFiles();
            }
        });

    },
    ViewActivityLogs: function () {
        $.ajax({
			url: this.ErrorLogAction,
           
            type: 'GET',
            success: function (data) {
                $(data).each(function (index) {
                    $("#activdityLogs").append("<div class='col-md-11'>" + data[index] + "</div>");
                });
            }
        });
    },
    ViewLogs: function () {
        $.ajax({
            url: this.ViewLogAction,
            type: 'GET',
            success: function (data) {
                $(data).each(function (index) {
                    $("#messageLogs").append("<div class='col-md-11'>" + data[index] + "</div>");
                });
            }
        });
    },
    ClearContent: function (container) {
        if ($(container).length > 0) {
            $(container).html("");
        }
    },
    ProgressBar: function (complete) {
        $("#loader .progress-bar").css({ width: complete + "%" });
    },
    LogOut: function () {
        $.ajax({
            url: this.LogOutAction,
            type: 'POST',
            success: function () {
                window.location = '/Account/Login';
            }
        });
    }

};
