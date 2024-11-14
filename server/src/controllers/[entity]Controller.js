const [Entity] = require('../models/[Entity]');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all [entities]
// @route     GET /api/v1/[entities]
// @access    Public or Private (depending on your needs)
exports.get[Entities] = asyncHandler(async (req, res, next) => {
    const [entities] = await [Entity].find();
    res.status(200).json({ success: true, count: [entities].length, data: [entities] });
});

// @desc      Get single [entity]
// @route     GET /api/v1/[entities]/:id
// @access    Public or Private
exports.get[Entity] = asyncHandler(async (req, res, next) => {
    const [entity] = await [Entity].findById(req.params.id);

    if (!entity) {
        return next(new ErrorResponse(`[Entity] not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: [entity] });
});

// @desc      Create new [entity]
// @route     POST /api/v1/[entities]
// @access    Private
exports.create[Entity] = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const [entity] = await [Entity].create(req.body);

    res.status(201).json({
        success: true,
        data: [entity]
    });
});

// @desc      Update [entity]
// @route     PUT /api/v1/[entities]/:id
// @access    Private
exports.update[Entity] = asyncHandler(async (req, res, next) => {
    let [entity] = await [Entity].findById(req.params.id);

    if (!entity) {
        return next(new ErrorResponse(`[Entity] not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is [entity] owner
    if (entity.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this [entity]`, 401));
    }

    [entity] = await [Entity].findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: [entity] });
});

// @desc      Delete [entity]
// @route     DELETE /api/v1/[entities]/:id
// @access    Private
exports.delete[Entity] = asyncHandler(async (req, res, next) => {
    const [entity] = await [Entity].findById(req.params.id);

    if (!entity) {
        return next(new ErrorResponse(`[Entity] not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is [entity] owner
    if (entity.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this [entity]`, 401));
    }

    await [entity].remove();

    res.status(200).json({ success: true, data: {} });
});