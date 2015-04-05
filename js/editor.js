$(document).ready(function(){
	var commandHistory = [];
	var commandIndex = 0;

	function printToConsole(result) {
		var current = $('#consoleOutput').val();
		var output = current === '' ? result : current+'\n\n'+result;
		$('#consoleOutput').text(output);
	}

	function run(program, console) {
		var r = !console ? '=> ' : '>> '+program+'\n=>  ';
		try {
			r += interpret(program);
		} catch (e) {
			r += e.message;
		}
		return r;
	}

	$('#consoleInput').keyup(function(e) {
		if (e.keyCode === 13) {
			var input = $('#consoleInput').val();
			commandHistory.push(input);
			commandIndex = commandHistory.length - 1;
			$('#consoleInput').val('');
			printToConsole(run(input, true));
		} else if (e.keyCode === 38) {
			commandHistory.push($('#consoleInput').val());
			$('#consoleInput').val(commandHistory[commandIndex]);
			commandIndex -= 1;
			if (commandIndex < 0) {
				commandIndex = commandHistory.length-1;
			}
		} else if (e.keyCode === 40) {
			commandHistory.push($('#consoleInput').val());
			$('#consoleInput').val(commandHistory[commandIndex]);
			commandIndex = (commandIndex+1)%commandHistory.length;
		}
	});

	$('#runBtn').click(function() {
		var program = $('#programInput').val();
		printToConsole(run(program, false));
	});
});