// Get the containers for each sorting algorithm's bars
const bubbleSortBars = document.getElementById('bubbleSortBars');
const insertionSortBars = document.getElementById('insertionSortBars');
const mergeSortBars = document.getElementById('mergeSortBars');
const quickSortBars = document.getElementById('quickSortBars');
const selectionSortBars = document.getElementById('selectionSortBars');
// Get the timer placeholders for each sorting algorithm
const bubbleSortTimer = document.getElementById('bubbleSortTimer');
const insertionSortTimer = document.getElementById('insertionSortTimer');
const mergeSortTimer = document.getElementById('mergeSortTimer');
const quickSortTimer = document.getElementById('quickSortTimer');
const selectionSortTimer = document.getElementById('selectionSortTimer');
// Get Buttons
const startSortBtn = document.getElementById('startSortBtn');
const generateArrayBtn = document.getElementById('generateArrayBtn');
// Get Checkboxes
const showBubbleSort = document.getElementById('showBubbleSort');
const showInsertionSort = document.getElementById('showInsertionSort');
const showMergeSort = document.getElementById('showMergeSort');
const showQuickSort = document.getElementById('showQuickSort');
const showSelectionSort = document.getElementById('showSelectionSort');
// Get the container for the sorting algorithms
const bubbleSortContainer = document.getElementById('bubbleSortContainer');
const insertionSortContainer = document.getElementById(
  'insertionSortContainer'
);
const mergeSortContainer = document.getElementById('mergeSortContainer');
const quickSortContainer = document.getElementById('quickSortContainer');
const selectionSortContainer = document.getElementById(
  'selectionSortContainer'
);

// Array to store the random array
let array = [];

// Timers (in seconds) for each sorting algorithm
let bubbleSortTime = 0;
let insertionSortTime = 0;
let mergeSortTime = 0;
let quickSortTime = 0;

const delay = 40; // Delay in milliseconds for the sorting visualization
let RunningAlgorithms = []; // Array to store the running algorithms
const AmountOfBars = window.innerWidth < 500 ? 30 : 50; // try to display 50 bars but show only 30 on mobile

let isSorting = false;

// Function to generate a random array
function generateRandomArray(size = AmountOfBars) {
  let array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 220) + 5);
  }
  return array;
}

// Function to display the array as bars in a specific container
function displayArray(array, container) {
  container.innerHTML = ''; // Clear the previous array
  array.forEach((height) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${height}px`;
    container.appendChild(bar);
  });
}

// Sleep function to add delay in the sorting visualization
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Bubble Sort Visualization
async function bubbleSort(array, container) {
  const bars = container.getElementsByClassName('bar');
  // Start the timer
  const startTime = Date.now();

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = 'red';
      bars[j + 1].style.backgroundColor = 'red';

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }

      await sleep(delay);
      // Update the timer
      bubbleSortTime = (Date.now() - startTime) / 1000;
      bubbleSortTimer.textContent = bubbleSortTime.toFixed(2);

      // Reset the colors
      bars[j].style.backgroundColor = 'rgb(92, 65, 124)';
      bars[j + 1].style.backgroundColor = 'rgb(92, 65, 124)';
    }
  }

  // Display the final time
  bubbleSortTimer.textContent = bubbleSortTime.toFixed(2);
}

// Insertion Sort Visualization
async function insertionSort(array, container) {
  const bars = container.getElementsByClassName('bar');
  // Start the timer
  const startTime = Date.now();

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      bars[j + 1].style.height = `${array[j]}px`;
      array[j + 1] = array[j];
      bars[j + 1].style.backgroundColor = 'red';
      await sleep(delay);
      // Update the timer
      insertionSortTime = (Date.now() - startTime) / 1000;
      insertionSortTimer.textContent = insertionSortTime.toFixed(2);

      // Reset the colors
      bars[j + 1].style.backgroundColor = 'rgb(92, 65, 124)';
      j = j - 1;
    }

    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
  }

  // Display the final time
  insertionSortTimer.textContent = insertionSortTime.toFixed(2);
}

let startTimeMergeSort = 0;

// Merge Sort Visualization
async function mergeSort(array, start, end, container) {
  // Start the timer for Merge Sort
  startTimeMergeSort = Date.now();

  async function mergeSortHelper(array, start, end, container) {
    if (start >= end) return;

    const middle = Math.floor((start + end) / 2);
    await mergeSortHelper(array, start, middle, container);
    await mergeSortHelper(array, middle + 1, end, container);

    await merge(array, start, middle, end, container);
  }

  await mergeSortHelper(array, start, end, container);

  // Display the final time
  mergeSortTime = (Date.now() - startTimeMergeSort) / 1000;
  mergeSortTimer.textContent = mergeSortTime.toFixed(2);
}

async function merge(array, start, middle, end, container) {
  const bars = container.getElementsByClassName('bar');
  let leftArray = array.slice(start, middle + 1);
  let rightArray = array.slice(middle + 1, end + 1);

  let i = 0,
    j = 0,
    k = start;

  while (i < leftArray.length && j < rightArray.length) {
    bars[k].style.backgroundColor = 'red';
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      bars[k].style.height = `${leftArray[i]}px`;
      i++;
    } else {
      array[k] = rightArray[j];
      bars[k].style.height = `${rightArray[j]}px`;
      j++;
    }
    await sleep(delay);
    bars[k].style.backgroundColor = 'rgb(92, 65, 124)';

    // Update the timer during merge process
    mergeSortTime = (Date.now() - startTimeMergeSort) / 1000;
    mergeSortTimer.textContent = mergeSortTime.toFixed(2);

    k++;
  }

  while (i < leftArray.length) {
    bars[k].style.height = `${leftArray[i]}px`;
    array[k] = leftArray[i];
    i++;
    k++;
  }

  while (j < rightArray.length) {
    bars[k].style.height = `${rightArray[j]}px`;
    array[k] = rightArray[j];
    j++;
    k++;
  }
}

let startTimeQuickSort = 0;

// Quick Sort Visualization
async function quickSort(array, low, high, container) {
  // Start the timer for Quick Sort
  startTimeQuickSort = Date.now();

  async function quickSortHelper(array, low, high, container) {
    if (low < high) {
      let pi = await partition(array, low, high, container);
      await quickSortHelper(array, low, pi - 1, container);
      await quickSortHelper(array, pi + 1, high, container);
    }
  }

  await quickSortHelper(array, low, high, container);

  // Display the final time
  quickSortTime = (Date.now() - startTimeQuickSort) / 1000;
  quickSortTimer.textContent = quickSortTime.toFixed(2);
}

async function partition(array, low, high, container) {
  const bars = container.getElementsByClassName('bar');
  let pivot = array[high];
  let i = low - 1;

  bars[high].style.backgroundColor = 'red';
  for (let j = low; j < high; j++) {
    bars[j].style.backgroundColor = 'yellow';
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[j].style.height = `${array[j]}px`;
    }
    await sleep(delay);
    // Update the timer
    quickSortTime = (Date.now() - startTimeQuickSort) / 1000;
    quickSortTimer.textContent = quickSortTime.toFixed(2);
    // Reset the colors
    bars[j].style.backgroundColor = 'rgb(92, 65, 124)';
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  bars[high].style.height = `${array[high]}px`;
  bars[i + 1].style.height = `${array[i + 1]}px`;
  await sleep(delay);
  // Update the timer
  quickSortTime = (Date.now() - startTimeQuickSort) / 1000;
  quickSortTimer.textContent = quickSortTime.toFixed(2);
  // Reset the colors
  bars[high].style.backgroundColor = 'rgb(92, 65, 124)';

  return i + 1;
}

// Selection Sort Visualization
async function selectionSort(array, container) {
  const bars = container.getElementsByClassName('bar');
  // Start the timer
  const startTime = Date.now();

  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    bars[minIndex].style.backgroundColor = 'red';

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = 'yellow';

      if (array[j] < array[minIndex]) {
        bars[minIndex].style.backgroundColor = 'rgb(92, 65, 124)';
        minIndex = j;
        bars[minIndex].style.backgroundColor = 'red';
      }
      await sleep(delay);
      // Update the timer
      selectionSortTime = (Date.now() - startTime) / 1000;
      selectionSortTimer.textContent = selectionSortTime.toFixed(2);

      // Reset the colors
      bars[j].style.backgroundColor = 'rgb(92, 65, 124)';
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[minIndex].style.height = `${array[minIndex]}px`;
    }

    bars[i].style.backgroundColor = 'rgb(92, 65, 124)';
  }

  // Display the final time
  selectionSortTimer.textContent = selectionSortTime.toFixed(2);
}

// Event listener for the 'Start Sorting' button
startSortBtn.addEventListener('click', async () => {
  // Check if a sorting process is already running
  if (isSorting) return;

  // Set the isSorting flag to true to prevent multiple sorting processes
  isSorting = true;
  // Disable the 'Generate New Array' button while sorting
  generateArrayBtn.disabled = true;

  // Clone the array for each algorithm
  let bubbleArray = [...array];
  let insertionArray = [...array];
  let mergeArray = [...array];
  let quickArray = [...array];
  let selectionArray = [...array];

  // Display the initial arrays
  displayArray(bubbleArray, bubbleSortBars);
  displayArray(insertionArray, insertionSortBars);
  displayArray(mergeArray, mergeSortBars);
  displayArray(quickArray, quickSortBars);
  displayArray(selectionArray, selectionSortBars);

  // Create an array to store promises for each sorting algorithm
  const sortingPromises = [
    bubbleSort(bubbleArray, bubbleSortBars),
    insertionSort(insertionArray, insertionSortBars),
    mergeSort(mergeArray, 0, mergeArray.length - 1, mergeSortBars),
    quickSort(quickArray, 0, quickArray.length - 1, quickSortBars),
    selectionSort(selectionArray, selectionSortBars),
  ];

  // Wait for all sorting algorithms to finish
  await Promise.all(sortingPromises).then(() => {
    // Once all sorting algorithms are done, set the isSorting flag to false
    isSorting = false;
    // Enable the 'Generate New Array' button after sorting
    generateArrayBtn.disabled = false;
  });
});

// Event listener for the 'Generate New Array' button
generateArrayBtn.addEventListener('click', () => {
  // Stop the sorting algorithms if they are running
  RunningAlgorithms.forEach((algorithm) => {
    if (algorithm) {
      algorithm.cancel();
    }
  });

  // Generate a new random array
  const newArray = generateRandomArray();
  array = newArray;

  // Display the new arrays in each container
  displayArray(newArray, bubbleSortBars);
  displayArray(newArray, insertionSortBars);
  displayArray(newArray, mergeSortBars);
  displayArray(newArray, quickSortBars);
  displayArray(newArray, selectionSortBars);
});

// Event listeners for the checkboxes to show/hide the sorting algorithms
showBubbleSort.addEventListener('change', () => {
  bubbleSortContainer.classList.toggle('hidden');
});
showInsertionSort.addEventListener('change', () => {
  insertionSortContainer.classList.toggle('hidden');
});
showMergeSort.addEventListener('change', () => {
  mergeSortContainer.classList.toggle('hidden');
});
showQuickSort.addEventListener('change', () => {
  quickSortContainer.classList.toggle('hidden');
});
showSelectionSort.addEventListener('change', () => {
  selectionSortContainer.classList.toggle('hidden');
});

// Generate an initial random array when the page loads
window.onload = () => {
  const randomArray = generateRandomArray();
  array = randomArray;
  displayArray(randomArray, bubbleSortBars);
  displayArray(randomArray, insertionSortBars);
  displayArray(randomArray, mergeSortBars);
  displayArray(randomArray, quickSortBars);
  displayArray(randomArray, selectionSortBars);
};
