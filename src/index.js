  module.exports = function solveSudoku(originalMatrix) {

	let matrix = originalMatrix;

	for (let i = 0; i< 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (matrix[i][j] === 0) {
				let x = Math.floor(i / 3), y = Math.floor(j / 3);
				let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
				for (let k = 0; k < 9; k++) {
					if (arr.includes(matrix[k][j])) {
						arr[arr.indexOf(matrix[k][j])] = 0;
					}
				}
				for (let m = 0; m < 9; m++) {
					if (arr.includes(matrix[i][m])) {
						arr[arr.indexOf(matrix[i][m])] = 0;
					}
				}
				for (let r = x * 3; r < x * 3 + 3; r++) {
					for (let t = y * 3; t < y * 3 + 3; t++) {
						if (arr.includes(matrix[r][t])) {
							arr[arr.indexOf(matrix[r][t])] = 0;
						}
					}
				}
				const newArr = arr.filter((x) => x > 0);
				matrix[i][j] = newArr;
			}
		}
	}

	function findSingle () {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (matrix[i][j].hasOwnProperty('length') && 
					matrix[i][j].length === 1) {
					matrix[i][j] = matrix[i][j][0];
					refresh(i, j, matrix[i][j]);
				}
			}
		}
	}

	function findHidden() {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (matrix[i][j].hasOwnProperty('length')) {
					for (let k = 0; k < matrix[i][j].length; k++) {
						if (sqrCheck(i, j, matrix[i][j][k]) ||
							rowCheck(i, j, matrix[i][j][k]) ||
							colCheck(i, j, matrix[i][j][k])) {
							matrix[i][j] = matrix[i][j][k];
							refresh(i, j, matrix[i][j]);
							break;
						}
					}
				}
			}
		}
	}

	function sqrCheck(i, j, value) {
		let x = Math.floor(i / 3), y = Math.floor(j / 3);
		for (let a = x * 3; a < x * 3 + 3; a++) {
			for (let b = y * 3; b < y * 3 + 3; b++) {
				if (a === i && b === j) {
					continue;
				} else if (matrix[a][b].hasOwnProperty('length') && 
					matrix[a][b].includes(value)) {
					return false;
				} else {
					continue;
				}
			}
		}
		return true;
	}

	function rowCheck(i, j, value) {
		for (let a = 0; a < 9; a++) {
			if (matrix[i][a].hasOwnProperty('length') &&
				matrix[i][a].includes(value) &&
				a !== j) {
				return false;
			} else {
				continue; 
			}
		}
		return true;
	}

	function colCheck(i, j, value) {
		for (let b = 0; b < 9; b++) {
			if (matrix[b][j].hasOwnProperty('length') &&
				matrix[b][j].includes(value) &&
				b !== i) {
				return false;
			} else {
				continue;
			}
		}
		return true;
	}

	function refresh(i, j, value) {
		let x = Math.floor(i / 3), y = Math.floor(j / 3);
		for (let p = x * 3; p < x * 3 + 3; p++) {
			for (let q = y * 3; q < y * 3 + 3; q++) {
				if (matrix[p][q].hasOwnProperty('length') && matrix[p][q].includes(value)) {
					matrix[p][q] = matrix[p][q].filter((x) => x !== value)
				}
			}
		}
		for (let a = 0; a < 9; a++) {
			if (matrix[i][a].hasOwnProperty('length') && matrix[i][a].includes(value)) {
					matrix[i][a] = matrix[i][a].filter((x) => x !== value)
				}
		}
		for (let b = 0; b < 9; b++) {
			if (matrix[b][j].hasOwnProperty('length') && matrix[b][j].includes(value)) {
					matrix[b][j] = matrix[b][j].filter((x) => x !== value)
				}
		}
	}

	findSingle();
	findSingle();
	// findSingle();
	// findSingle();
	findHidden();
	findSingle();
	findHidden();
	// findSingle();
	findHidden();

	for(let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (matrix[i][j] == undefined ||
				(matrix[i][j].hasOwnProperty('length') &&
					matrix[i][j].length === 0)) {
				// console.log('Going back!');
				return;
			}
		}
	}

	noChanges();

	function noChanges () {
		tempMatrix = matrix;
		findSingle();
		findHidden();
		if (tempMatrix == matrix) {

			// Has no more singles or hidden
			for (let i = 0; i < 9; i++) {
				for (let j = 0; j < 9; j++) {
					if (matrix[i][j].hasOwnProperty('length')) {
						let temArray = matrix[i][j];
						for (let k = 0; k < matrix[i][j].length; k++) {
							matrix[i][j] = matrix[i][j][k];
							refresh(i, j, matrix[i][j]);
							solveSudoku(matrix);
						}
						matrix[i][j] = temArray;
					}
				}
			}
		}
	}
	
	findHidden();

	return matrix;
}